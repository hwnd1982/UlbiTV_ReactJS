import React from "react";
import classes from './Loader.module.css'

const Loader = () => {
  return (
    <div className={classes.wrap}>
      <svg
        className={classes.loader}
        viewBox="-3 -3 106 106">
        <circle className={classes.circle} cx="50" cy="50" r="50" />
      </svg>
    </div>
  );
};

export default Loader;