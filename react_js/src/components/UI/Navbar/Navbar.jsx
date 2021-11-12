import React from "react";
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';


const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.navbarItems}>
        <Link className={classes.navbarLinks} to='/about'>О сайте</Link>
        <Link className={classes.navbarLinks} to='/posts'>Посты</Link>
      </div>
    </div>
  );
};

export default Navbar;
