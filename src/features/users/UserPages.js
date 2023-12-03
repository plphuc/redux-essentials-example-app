import { useSelector } from 'react-redux';
import { selectPostsByUser } from '../posts/postsSlice';
import { Link } from 'react-router-dom';
import { selectUserById, useGetUsersQuery } from './usersSlice';
import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';

function UserPages({ match }) {
  const { userId } = match.params;
  const userInfo = useSelector((state) => selectUserById(state, userId));

  const selectPostsOfUser = useMemo(() =>
    createSelector(
      (res) => res.data,
      (res, userId) => userId,
      (data, userId) => data?.filter((post) => post.user === userId) ?? []
    )
  );
  const { postsOfUser } = useGetUsersQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsOfUser: selectPostsOfUser(result, userId),
    }),
  });
  const postTitles = postsOfUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{userInfo.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  );
}

export default UserPages;
