import React, { Component } from 'react'
import DrawerToggleButton from '../TopDrawer/DrawerToggleButton'
import './Toolbar.css'
import Logo from '../Logo/Logo'
import {NavLink} from 'react-router-dom'
import history from '../../history'

class toolbar extends Component {

  
  render() {
    let menu_logo = history.location.pathname === '/'? null : <div className="toolbar__logo"><a href="/"><Logo /></a></div>
    return (
        <header className="toolbar">
          <nav className="toolbar__navigation">
            {menu_logo}
           
            <div className="center__spacer"></div>
            <div className="toolbar__navigation__items">
              <ul>
                <li><NavLink to='/' exact>Home</NavLink></li>
                <li><NavLink to='/all-posts' exact>Posts</NavLink></li>
                <li><NavLink to='/contact' exact>Contact</NavLink></li>
                <li><NavLink to='/users/login' exact>{this.props.isLoggedIn}</NavLink></li>
                <li><span id="beta_label">beta</span></li>
              </ul>
            </div>
            <div className="toolbar__toggle-button">
              <DrawerToggleButton click={this.props.drawerClickedHander}/>
            </div>
          </nav>
        </header>
    )
  }
}

export default toolbar