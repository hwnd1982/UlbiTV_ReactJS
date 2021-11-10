import React, { useState, useEffect } from 'react';
import ClassInput from './components/ClassInput';
import Counter from './components/Counter';
import PostsList from './components/PostsList';
import PostForm from './components/PostForm';
import './styles/App.css';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './components/API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './utils/pages'
import Pagination from './components/UI/pagination/Pagination';

function App() {
  const 
    [posts, setPosts] = useState([]),
    [filter, setFilter] = useState({sort: '', query: ''}),
    [modal, setModal] = useState(false),
    [totalPages, setTotalPages] = useState(0),
    [limin] = useState(10),
    [page, setPage] = useState(1),
    [fetchPosts, isPostsLoading, postError] = useFetching(async() => {
        const response = await PostService.getAllPosts(limin, page),
        totalCount = response.headers['x-total-count'];

        setPosts(response.data);
        setTotalPages(getPageCount(totalCount, limin))
    }),
    sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query),
    createPost = newPost => {
      setPosts([...posts, newPost]);
      setModal(false)
    },
    removePost = post => {
      setPosts(posts.filter(item => item.id !== post.id));
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchPosts(), [page]);
  return (
    <div className="App">
      <hr/>
      <ClassInput/>
      <Counter/>
      <hr/>
      <MyButton
        style={{marginBottom: '15px'}}
        onClick={() => setModal(true)}
      >
        Создать пост
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {
        postError ?
          <h1 style={{
            display: 'flex',
            justifyContent: 'center',
            color: 'orangered',
            marginTop: '50px'
          }}>Произошла ошибка: {postError}</h1> :
          isPostsLoading ?
            <Loader /> :
            <PostsList
              remove={removePost}
              posts={sortedAndSearchedPosts} 
              title="Список постов..."
            />
      }
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={setPage}
      />
    </div>
  );
}

export default App;
