import React, { useState } from 'react';
import ClassInput from './components/ClassInput';
import Counter from './components/Counter';
import PostsList from './components/PostsList';
import PostForm from './components/PostForm';
import generateHexString from './modules/generateHexString';
import './styles/App.css';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';

function App() {
  const 
    [posts, setPosts] = useState([
      {
        id: generateHexString(10),
        title: 'JavaScript',
        body: 'Язык программирования.'
      },
      {
        id: generateHexString(10),
        title: 'React',
        body: 'Библиотека с открытым исходным кодом для разработки пользовательских интерфейсов.'
      },
      {
        id: generateHexString(10),
        title: 'Vue',
        body: 'Фреймворк с открытым исходным кодом для создания пользовательских интерфейсов.'
      }
    ]),
    [filter, setFilter] = useState({sort: '', query: ''}),
    [modal, setModal] = useState(false),
    sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query),
    createPost = newPost => {
      setPosts([...posts, newPost]);
      setModal(false)
    },
    removePost = post => {
      setPosts(posts.filter(item => item.id !== post.id));
    };
    
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
      <PostsList
        remove={removePost}
        posts={sortedAndSearchedPosts} 
        title="Список постов..."
      />
    </div>
  );
}

export default App;
