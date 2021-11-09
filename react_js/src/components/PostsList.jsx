import React from "react";
import PostItem from "./PostItem";

const PostsList = ({ posts, title, remove }) => {
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
      {posts.map((post, index) =>
        <PostItem index={index + 1} post={post} remove={remove} key={post.id} />
      )}
    </div>
  )
}

export default PostsList;
