import React, { useMemo, useState } from 'react';
import ClassInput from './components/ClassInput';
import Counter from './components/Counter';
import PostsList from './components/PostsList';
import PostForm from './components/PostForm';
import generateHexString from './modules/generateHexString';
import './styles/App.css';
import PostFilter from './components/PostFilter';

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
    sortedPosts = useMemo(() => {
      if (filter.sort) {
        return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
      }
      return posts;
    }, [filter.sort, posts]),
    sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
    }, [filter.query, sortedPosts]),
    ceatePost = newPost => {
      setPosts([...posts, newPost]);
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
      <PostForm create={ceatePost} />
      <hr/>
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
