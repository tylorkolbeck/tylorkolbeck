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
      <li><a href="/">Syncs</a></li>
      <li><a href="/">About</a></li>
      <li><a href="/">Contact</a></li>
    </ul>
  </nav>
  )
}
  


export default topDrawer