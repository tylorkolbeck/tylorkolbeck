import React from 'react'
import './TopDrawer.css'


const topDrawer = props => {
  let drawerClasses = ['top-drawer']

  if (props.show) {
    drawerClasses = ['top-drawer', 'open']
  }

  return (
  <nav className={drawerClasses.join(' ')}>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/all-posts">Posts</a></li>
      {/* <li><a href="/about">About</a></li> */}
      <li><a href="/contact">Contact</a></li>
      <li><a href="/new-post">New</a></li>
      <li><a href="/users/login">{props.isLoggedIn}</a></li>
    </ul>
  </nav>
  )
}
  


export default topDrawer