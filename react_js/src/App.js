/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Counter from './components/UI/counter/Counter';
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
    [limit, setLimit] = useState(10),
    [page, setPage] = useState(1),
    [fetchPosts, isPostsLoading, postError] = useFetching(async() => {
        const response = await PostService.getAllPosts(limit, page),
        totalCount = response.headers['x-total-count'];

        setPosts(response.data);
        setTotalPages(getPageCount(totalCount, limit))
    }),
    sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query),
    createPost = newPost => {
      setPosts([...posts, newPost]);
      setModal(false)
    },
    removePost = post => {
      setPosts(posts.filter(item => item.id !== post.id));
    };
  
  useEffect(() => fetchPosts(), [page, limit]);
  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <PostFilter filter={filter} setFilter={setFilter} >
        <Counter setLimit={setLimit} />    
      </PostFilter>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      {
        postError ?
          <h1 className='error-message'>Произошла ошибка: {postError}</h1> :
          isPostsLoading ?
            <Loader /> : <PostsList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов..." />
      }
      <Pagination totalPages={totalPages} page={page} changePage={setPage} />
    </div>
  );
}

export default App;
