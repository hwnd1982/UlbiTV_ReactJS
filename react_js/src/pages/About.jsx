import React from "react";

import Profile from "../components/UI/profile/Profile";
import classes from '../styles/About.module.css';

const About = () => {
  return (
    <div className={classes.aboutContainer}>
      <h1 className={classes.aboutTitle}>
        Это приложение создано по  видео на канале ULBI TV
      </h1>
      <Profile />
    </div>
  );
};

export default About;
