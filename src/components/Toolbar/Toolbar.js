import React from 'react'
import DrawerToggleButton from '../TopDrawer/DrawerToggleButton'
import './Toolbar.css'
import Logo from '../Logo/Logo'

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__logo"><a href="/"><Logo /></a></div>
     
      <div className="center__spacer"></div>
      <div className="toolbar__navigation__items">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Syncs</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </div>
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickedHander}/>
      </div>
    </nav>
  </header>
)

export default toolbar