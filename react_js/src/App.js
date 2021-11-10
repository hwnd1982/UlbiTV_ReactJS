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

function App() {
  const 
    [posts, setPosts] = useState([]),
    [filter, setFilter] = useState({sort: '', query: ''}),
    [modal, setModal] = useState(false),
    [isPostsLoadung, setIsPostsLoadung] = useState(false),
    sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query),
    fetchPosts = async () => {
      setIsPostsLoadung(true);
      setTimeout(async () => {
        const posts = await PostService.getAllPosts();

        setPosts(posts);
        setIsPostsLoadung(false);
      }, 3000);
    },
    createPost = newPost => {
      setPosts([...posts, newPost]);
      setModal(false)
    },
    removePost = post => {
      setPosts(posts.filter(item => item.id !== post.id));
    };
  
  useEffect(() => {
    fetchPosts();
  }, []);
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
      {isPostsLoadung ?
        <Loader /> :
        <PostsList
          remove={removePost}
          posts={sortedAndSearchedPosts} 
          title="Список постов..."
        />}
    </div>
  );
}

export default App;
