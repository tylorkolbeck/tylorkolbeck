import React from 'react'
import DrawerToggleButton from '../TopDrawer/DrawerToggleButton'
import './Toolbar.css'
import Logo from '../Logo/Logo'
import {NavLink} from 'react-router-dom'

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__logo"><a href="/"><Logo /></a></div>
     
      <div className="center__spacer"></div>
      <div className="toolbar__navigation__items">
        <ul>
          <li><NavLink to='/' exact>Home</NavLink></li>
          <li><NavLink to='/syncs'>Syncs</NavLink></li>
          <li><NavLink to='/about' exact>About</NavLink></li>
          <li><NavLink to='/contact' exact>Contact</NavLink></li>
          <li><NavLink to='/new-post' exact>New</NavLink></li>
        </ul>
      </div>
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickedHander}/>
      </div>
    </nav>
  </header>
)

export default toolbar