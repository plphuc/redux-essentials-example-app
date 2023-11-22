import React from 'react';
import { Link } from 'react-router-dom';

import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { useGetPostByIdQuery } from '../api/apiSlice';
import { Spinner } from '../../components/Spinner';

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params;

  const { data: post, isFetching } = useGetPostByIdQuery(postId);

  const handleShowPost = () => {
    if (isFetching) {
      return <Spinner text="Loading..." />;
    } else if (!post) {
      return (
        <section>
          <h2>Post not found!</h2>
        </section>
      );
    } else {
      return (
        <section>
          <article className="post">
            <h2>{post.title}</h2>
            <div>
              <PostAuthor userId={post.user} />
              <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content}</p>
            <ReactionButtons post={post} />
            <Link to={`/editPost/${post.id}`} className="button">
              Edit Post
            </Link>
          </article>
        </section>
      );
    }
  };

  return <div>{handleShowPost()}</div>;
};
