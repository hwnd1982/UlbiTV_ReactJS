import { Navigate } from 'react-router-dom';
import About from "../pages/About";
import Error from "../pages/Error";
import Login from '../pages/Login';
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import ToDos from '../pages/ToDos';

export const privateRoutes = [
  {path: `UlbiTV-ReactJS/about`, element: <About />, exact: true},
  {path: `UlbiTV-ReactJS/posts`, element: <Posts />, exact: true},
  {path: `UlbiTV-ReactJS/todos`, element: <ToDos />, exact: true},
  {path: `UlbiTV-ReactJS/posts/:id`, element: <PostIdPage />, exact: true},
  {path: `UlbiTV-ReactJS/`, element: <Posts />, exact: true},
  {path: `UlbiTV-ReactJS/error`, element: <Error />, exact: true},
  {path: `UlbiTV-ReactJS/login`, element: <Navigate replace to='../UlbiTV-ReactJS/posts' />, exact: true},
  // {path: `UlbiTV-ReactJS/*`, element: <Navigate replace to='error' />, exact: true}
];

export const publicRoutes = [
  {path: `UlbiTV-ReactJS/login`, element: <Login />, exact: true},
  {path: `UlbiTV-ReactJS/*`, element: <Navigate replace to='login'/>, exact: true}
];