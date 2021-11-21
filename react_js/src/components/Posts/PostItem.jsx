import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom'
import useHover from "../hooks/useHover";
import MyButton from "./UI/button/MyButton";

const PostItem = ({ index, post, remove }) => {
  const
    navigate = useNavigate(),
    ref = useRef(),
    isHovering = useHover(ref);

  return (
    <div ref={ref} style={{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }} className="post">
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
