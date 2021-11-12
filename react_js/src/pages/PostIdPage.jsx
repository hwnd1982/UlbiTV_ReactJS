/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostService from "../components/API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import classes from '../styles/PostIdPage.module.css'
import '../styles/App.css';

const PostIdPage = () => {
  const
    params = useParams(),
    [post, setPost] = useState({ id: '', title: '', body: '' }),
    [comments, setComments] = useState([]),
    [fetchPostById, isLoadind, postError] = useFetching(async () => {
      const response = await PostService.getPostById(params.id);

      setPost(response.data);
    }),
    [fetchComments, isComLoadind, comError] = useFetching(async () => {
      const response = await PostService.getCommentsByPostId(params.id);

      setComments(response.data);
    });

  useEffect(() => fetchPostById(), [params.id]);
  useEffect(() => fetchComments(), [post]);
  return (
    <div className={classes.postContainer}>
      {postError ? <h1 className='error-message'>Произошла ошибка: {postError}</h1> :
        !isLoadind &&
        <div className={classes.post}>
          <h2 className={classes.postTitle}>{post.id}. {post.title}</h2>
          <div>{post.body}</div>
        </div>}
      {comError ? <h1 className='error-message'>Произошла ошибка: {postError}</h1> :
        isComLoadind ? <Loader /> :
          <div className={classes.commentWrapp}>
            <h2 className={classes.commentTitle}>Комментарии:</h2>
            <div>
              {comments.map((comm, index) =>
                <div key={comm.id} className={classes.comment}>
                  <h3>{index + 1}. {comm.email}</h3>
                  <div>{comm.body}</div>
                </div>
              )}
            </div>
          </div>
      }
    </div>
  )
};

export default PostIdPage;
