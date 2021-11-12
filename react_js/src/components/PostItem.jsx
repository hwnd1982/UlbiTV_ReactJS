import React from "react";
import { useNavigate } from 'react-router-dom'
import MyButton from "./UI/button/MyButton";

const PostItem = ({ index, post, remove }) => {
  const navigate = useNavigate();

  return (
    <div className="post">
      <div className="post__content">
        <strong>{index}. {post.title}</strong>
        <div>
          {post.body}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => navigate(`/posts/${index}`)}>Открыть</MyButton>
        <MyButton onClick={() => remove(post)}>Удалить</MyButton>
      </div>
    </div>
  )
}

export default PostItem;
