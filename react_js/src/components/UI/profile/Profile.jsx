import React from "react";
import classes from './Profile.module.css';

const Profile = () =>
  <div className={classes.wrap}>
    <div className={classes.avatar}></div>
    <div className={classes.info}>
      <div className={classes.infoName}>
        Разработчик: Кирилл Лавров
      </div>
    </div>
  </div>;

export default Profile;