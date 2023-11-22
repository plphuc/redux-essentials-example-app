import React from 'react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Spinner } from '../../components/Spinner';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { useGetPostsQuery } from '../api/apiSlice';
import classNames from 'classnames';

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} key={post.id} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostsList = () => {
  // posts = [] to always have an array to sort
  const {
    data: posts = [],
    isLoading,
    isFetching,
    refetch,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  // useMemo() to avoid re-sorting every re-render
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  const handleShowPosts = () => {
    if (isLoading) {
      return <Spinner text="Loading..." />;
    } else if (isSuccess) {
      // Since the posts array already has all of the post objects,
      // we've switched back to passing the post objects themselves down as props.
      const renderedPosts = sortedPosts.map((post) => (
        <PostExcerpt post={post} key={post.id} />
      ));
      const containerClassname = classNames('posts-container', {
        disabled: isFetching,
      });
      return <div className={containerClassname}>{renderedPosts}</div>;
    } else if (isError) {
      return <div>{error}</div>;
    }
  };

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch posts</button>
      {handleShowPosts()}
    </section>
  );
};
