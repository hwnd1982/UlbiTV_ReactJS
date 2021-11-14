/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from 'react';
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../components/API/PostService';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getCurrentPage } from '../utils/pages'
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';
import ThreeDotLoader from '../components/UI/ThreeDotLoader/ThreeDotLoader';
import { PostState } from '../context/context';

function Posts() {
  const
    postsLimit = useContext(PostState),
    [posts, setPosts] = useState([]),
    [filter, setFilter] = useState({ sort: '', query: '' }),
    [modal, setModal] = useState(false),
    [totalPages, setTotalPages] = useState({ count: 0, page: 0 }),
    [pagesState, setPagesState] = useState({ limit: postsLimit.limit, page: 1 }),
    [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
      const response = await PostService.getAllPosts(pagesState),
        totalCount = response.headers['x-total-count'],
        uniquePostsId = new Set([...posts.map(post => post.id), ...response.data.map(post => post.id)]);

      posts.map(post => uniquePostsId.delete(post.id));
      setPosts([...posts, ...response.data.filter(post => uniquePostsId.has(post.id))]);
      setTotalPages({ count: totalCount, page: getPageCount(totalCount, pagesState.limit) })
    }),
    sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query),
    lastElement = useRef(),
    loading = useRef(),
    createPost = newPost => {
      setPosts([...posts, newPost]);
      setModal(false)
    },
    removePost = post => setPosts(posts.filter(item => item.id !== post.id));

  useObserver(lastElement, pagesState.page < totalPages.page, isPostsLoading, () => setPagesState({ ...pagesState, page: pagesState.page + 1 }));
  useEffect(() => fetchPosts(), [pagesState]);
  useEffect(() => {
    const currentPage = getCurrentPage(pagesState.limit, posts.length) || 1;

    postsLimit.limit = pagesState.limit;
    if (currentPage !== pagesState.page)
      setPagesState({ ...pagesState, page: currentPage });
  }, [pagesState.limit]);
  return (
    <div className="App">
      <div style={{ marginTop: '30px' }}>
        <MyButton onClick={() => setModal(true)}>
          Создать пост
        </MyButton>
      </div>
      <PostFilter filter={filter} setFilter={setFilter} >
        <MySelect
          value={pagesState.limit}
          onChange={value => setPagesState({ page: 1, limit: value })}
          defaultValue="Количество постов"
          options={[
            { value: '5', name: '5' },
            { value: '10', name: '10' },
            { value: '15', name: '15' },
            { value: '25', name: '25' },
            { value: `${totalPages.count}`, name: 'Показать все' }
          ]}
        />
      </PostFilter>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      {
        postError ?
          <h1 className='error-message'>Произошла ошибка: {postError}</h1> :
          <PostsList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов..." />
      }
      {isPostsLoading && <ThreeDotLoader ref={loading} />}
      <hr />
      {
        !isPostsLoading &&
        <div
          className='end-of-page'
          ref={lastElement}
        ></div>
      }
    </div>
  );
}

export default Posts;
