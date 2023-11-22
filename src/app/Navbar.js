import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import {
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter((noti) => !noti.read).length

  const fetchNewNotification = () => {
    dispatch(fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications 
              {numUnreadNotifications > 0 && <span className="badge">{numUnreadNotifications}</span>}
            </Link>
          </div>
          <button style={{ cursor: 'pointer' }} onClick={fetchNewNotification}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
