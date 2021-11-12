import React, { useContext } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import { AuthContext } from "../context/context";

const Login = () => {
  const
    { setIsAuth } = useContext(AuthContext),
    login = event => {
      event.preventDefault();
      setIsAuth(true);
      localStorage.setItem('isAuth', 'true')
    };

  return (
    <div>
      <h1>Страница авторизации</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  )
}

export default Login;