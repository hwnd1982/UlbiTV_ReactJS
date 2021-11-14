import React from "react";
import classes from './ThreeDotLoader.module.css'

const ThreeDotLoader = React.forwardRef((props, ref) => (
  <div ref={ref} {...props} className={classes.threeBounce}>
    {[1, 2, 3].map(index => <div key={`bounce_${index}`} className={[classes.child, classes[`bounce_${index}`]].join(' ')}></div>)}
  </div>
));

export default ThreeDotLoader;