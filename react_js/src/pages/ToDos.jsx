/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import TodoService from '../components/API/TodoService';
import MyInput from '../components/UI/input/MyInput';
import List from '../components/List/List';
import ThreeDotLoader from '../components/UI/ThreeDotLoader/ThreeDotLoader';
import { useFetching } from '../hooks/useFetching';
import { sorting, useFilterSearchSortEffect } from '../hooks/useFilterSearchSortEffect';
import { useObserver } from '../hooks/useObserver';
import { getPageCount } from '../utils/pages';

function ToDos() {
  const
    endOfPage = useRef(),
    [todos, setTodos] = useState([]),
    [completedTodos, setCompletedTodos] = useState([]),
    [nocompletedTodos, setNocompletedTodos] = useState([]),
    [query, setQuery] = useState(''),
    [pagination, setPagination] = useState({ limit: 10, page: 1 }),
    [totalTodosCount, setTotalTodosCount] = useState(0),
    [fetchTodos, isTodosLoading, todoError] = useFetching(async () => {
      const
        response = await TodoService.getAllTodos(pagination),
        uniquePostsId = new Set([...todos.map(post => post.id), ...response.data.map(todo => todo.id)]);

      if (!totalTodosCount)
        setTotalTodosCount(getPageCount(response.headers['x-total-count'], pagination.limit));
      todos.map(todo => uniquePostsId.delete(todo.id));
      setTodos([...todos, ...response.data.filter(todo => uniquePostsId.has(todo.id))]);
      setPagination({ ...pagination, page: pagination.page + 1 })
    }),
    removeTodo = todo => {
      setTodos(todos.filter(item => item.id !== todo.id));
      setCompletedTodos(completedTodos.filter(item => item.id !== todo.id));
      setNocompletedTodos(nocompletedTodos.filter(item => item.id !== todo.id));
    },
    addTodo = (target, setState, from, setFrom, to, setTo) => {
      setState(target);
      setFrom(from.filter(item => item.id !== target.id));
      setTimeout(setTo, 500, sorting([target, ...to], 'id'));
    },
    toggleStateTodo = target => {
      todos.find(item => item.id === target.id).completed = target.completed;
      setTodos(todos);
    };

  useEffect(() => fetchTodos(), []);
  useObserver(endOfPage, pagination.page <= totalTodosCount, isTodosLoading, () => fetchTodos());
  useFilterSearchSortEffect(todos,
    [{ field: 'completed', query: true }], 'id',
    { field: 'title', query },
    setCompletedTodos, 1000);
  useFilterSearchSortEffect(todos,
    [{ field: 'completed', query: false }], 'id',
    { field: 'title', query },
    setNocompletedTodos, 1000);

  return (
    <div className='App'>
      <div style={{ marginTop: 15 }}>
        <MyInput
          value={query}
          onChange={event => setQuery(event.target.value)}
          type="text"
          placeholder="Поиск" />
      </div>
      {todoError ?
        <h1 className='error-message'>Произошла ошибка: {todoError.message}</h1> :
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          <List position='right' items={nocompletedTodos} remove={removeTodo}
            add={item => addTodo(
              item,
              toggleStateTodo,
              nocompletedTodos,
              setNocompletedTodos,
              completedTodos,
              setCompletedTodos)
            } title="Надо сделать..." />
          <List position='left'
            add={item => addTodo(
              item,
              toggleStateTodo,
              completedTodos,
              setCompletedTodos,
              nocompletedTodos,
              setNocompletedTodos)
            } remove={removeTodo} items={completedTodos} title="Выполнено..." />
        </div>}
      {isTodosLoading && <ThreeDotLoader />}
      <hr />
      <div ref={endOfPage} className='end-of-page'></div>
    </div>
  );
}

export default ToDos;
