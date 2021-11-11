import React, { useState, useEffect } from "react";
import classes from './Counter.module.css'

const Counter = ({ value = 10, min = 5, max = 20, step = 1, setLimit }) => {
  const
    [incrementDis, setIncrementDis] = useState(false),
    [decrementDis, setDecrementDis] = useState(false),
    minMax = () => {
      if (value < min) {
        setDecrementDis(true);
        return min;
      }
      if (value > max) {
        setIncrementDis(true);
        return max;
      }
    },
    [count, setCount] = useState(value >= min && value <= max ? value : minMax()),
    increment = () => {
      if (count < max) setCount(count + step);
      if (count === max - 1) setIncrementDis(true);
      else setIncrementDis(false);
      if (count => min) setDecrementDis(false);
    },
    decrement = () => {
      if (count > min) setCount(count - step);
      if (count === min + 1) setDecrementDis(true);
      else setDecrementDis(false);
      if (count <= max) setIncrementDis(false);
    }


  useEffect(() => setLimit(count), [count, setLimit]);
  return (
    <div className={classes.counterWrap}>
      <button
        disabled={incrementDis}
        className={classes.counterBtn}
        onClick={increment}
      >+</button>
      <span className={classes.count}>{count}</span>
      <button
        disabled={decrementDis}
        className={classes.counterBtn}
        onClick={decrement}
      >-</button>
    </div>
  )
};

export default Counter;
