import { useSelector } from 'react-redux'
import { selectPostsByUser } from '../posts/postsSlice'
import { Link } from 'react-router-dom'
import { selectUserById } from './usersSlice'

function UserPages({ match }) {
  const { userId } = match.params
  const userInfo = useSelector((state) => selectUserById(state, userId))

  const postsOfUser = useSelector((state) =>selectPostsByUser(state, userId))
  const postTitles = postsOfUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{userInfo.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPages
