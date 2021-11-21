// import React, { useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import generateHexKey from '../../utils/generateHexKey';
import useInput from "../../hooks/useInput";

const PostForm = ({ create }) => {
  const
    { value: title, setValue: setTitle, onChange: onChangeTitle } = useInput(''),
    { value: body, setValue: setBody, onChange: onChangeBody } = useInput(''),
    addNewPost = event => {
      event.preventDefault();
      const newPost = {
        title, body, id: generateHexKey(10)
      };

      create(newPost);
      setTitle('');
      setBody('')
    };
  return (
    <form>
      <MyInput
        value={title}
        onChange={onChangeTitle}
        type="text"
        placeholder="Название поста" />
      <MyInput
        value={body}
        onChange={onChangeBody}
        type="text"
        placeholder="Описание поста" />
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
