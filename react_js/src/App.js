import React, { useMemo, useState } from 'react';
import ClassInput from './components/ClassInput';
import Counter from './components/Counter';
import PostsList from './components/PostsList';
import PostForm from './components/PostForm';
import generateHexString from './modules/generateHexString';
import './styles/App.css';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';

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
    sortedPosts = useMemo(() => {
      if (filter.sort) {
        return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
      }
      return posts;
    }, [filter.sort, posts]),
    sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
    }, [filter.query, sortedPosts]),
    createPost = newPost => {
      setPosts([...posts, newPost]);
      setModal(false)
    },
    removePost = post => {
      setPosts(posts.filter(item => item.id !== post.id));
    };
    
  return (
    <div className="App">
      <ClassInput/>
      <hr/>
      <Counter/>
      <Counter/>
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
