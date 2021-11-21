import React from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from "../List/ListItem";

const PostsList = ({ posts, title, remove, open }) => {
  if (!posts.length) {
    return (
      <h1 style={{ textAlign: 'center' }}>
        Посты не найдены...
      </h1>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        {title}
      </h1>
      <TransitionGroup>
        {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="item"
          >
            <ListItem index={isNaN(post.id) ? index + 1 : post.id} item={{ ...post, name: 'posts' }} remove={remove} open={open} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  )
}

export default PostsList;
