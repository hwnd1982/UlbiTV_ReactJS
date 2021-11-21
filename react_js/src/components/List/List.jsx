import React from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from "./ListItem";

const List = ({ position, items, title, remove, add, open }) => {
  if (!items.length) {
    return (
      <h1 style={{ textAlign: 'center' }}>
        Список пуст...
      </h1>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        {title}
      </h1>
      <TransitionGroup>
        {items.map((item, index) =>
          <CSSTransition
            key={item.id}
            timeout={500}
            classNames={`item-${position}`}
          >
            <ListItem position={position} index={isNaN(item.id) ? index + 1 : item.id} item={{ ...item, name: 'posts' }} remove={remove} add={add} open={open} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  )
}

export default List;
