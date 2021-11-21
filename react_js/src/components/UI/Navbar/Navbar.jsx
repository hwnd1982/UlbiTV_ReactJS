import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/context";
import MyButton from "../button/MyButton";
import classes from './Navbar.module.css';


const Navbar = () => {
  const
    { isAuth, setIsAuth } = useContext(AuthContext),
    logout = () => {
      setIsAuth(false);
      localStorage.removeItem('isAuth');
    };

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContainer}>
        {isAuth &&
          <MyButton
            onClick={logout}
            style={{ marginTop: '0' }}
          >
            Выйти
          </MyButton>}
        <div className={classes.navbarItems}>
          <Link className={classes.navbarLinks} to={`UlbiTV-ReactJS/about`}>О сайте</Link>
          <Link className={classes.navbarLinks} to={`UlbiTV-ReactJS/posts`}>Посты</Link>
          <Link className={classes.navbarLinks} to={`UlbiTV-ReactJS/todos`}>ToDo</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
