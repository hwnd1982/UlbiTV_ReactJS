/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import classes from './styles/ListItem.module.css'
import useHover from "../../hooks/useHover";
import MyButton from "../UI/button/MyButton";

const ListItem = ({ index, item, remove, open, add, position }) => {
  const
    ref = useRef(),
    [isToggled, setIsToggled] = useState(item.completed),
    isHovering = useHover(ref);


  useEffect(() => {
    if (ref.current) {
      isHovering ? ref.current.classList.add(classes.hover) : ref.current.classList.remove(classes.hover);
    }
  }, [isHovering])
  useEffect(() => {
    if (ref.current && item.completed !== undefined) {
      if (item.completed) {
        ref.current.classList.remove(classes.nocompleted);
        ref.current.classList.add(classes.completed);
      } else {
        ref.current.classList.remove(classes.completed);
        ref.current.classList.add(classes.nocompleted);
      }
    }
  }, [isToggled]);
  return (
    <div ref={ref} onClick={event => {
      if (event.target.tagName.toLowerCase() !== 'button' && item.completed !== undefined) {
        item.completed = !item.completed;
        setIsToggled(item.completed);
        setTimeout(add, 0, item);
      }
    }} className={[classes.item, position ? `item-${position}` : 'item'].join(' ')}>
      <div className={classes.itemContent}>
        <strong>{index}. {item.title}</strong>
        {item.body && <div>
          {item.body}
        </div>}
      </div>
      {
        (remove || open) &&
        <div className={classes.itemBtns}>
          {open && <MyButton onClick={() => open(`UlbiTV-ReactJS/${item.name}/${index}`)}>Открыть</MyButton>}
          {remove && <MyButton onClick={() => remove(item)}>Удалить</MyButton>}
        </div>
      }
    </div >
  )
}

export default ListItem;
