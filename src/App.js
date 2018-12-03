import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Toolbar from './components/Toolbar/Toolbar'
import Login from './components/Login/Login'
import TopDrawer from './components/TopDrawer/TopDrawer'
import Backdrop from './components/Backdrop/Backdrop'
import Home from './containers/Home/Home'
import FullPost from './containers/FullPost/FullPost'
import NewPost from './containers/NewPost/NewPost'
import AllPosts from './containers/AllPosts/AllPosts'
import history from './history'



class App extends Component {
  state = {
    sideDrawerOpen: false,
    loginModalOpen: false,
    auth: true,
    filter: [],
    userId: false
  }

  componentDidMount() {
    if (localStorage.getItem('Authorization') && localStorage.getItem('userId')) {
      this.setState({userId: localStorage.getItem('userId')})
    }
  }

  componentDidUpdate() {
  }
  
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

  userIdSessionHandler = () => {
    if (this.state.userId !== false) {
      this.setState({userId: false})
    }
    if (!this.state.userId && localStorage.getItem('userId')) {
      this.setState({userId: localStorage.getItem('userId')})
    }
  }

  loginOrLogout = () => {
    let message = ''
    if (this.state.userId && (localStorage.getItem('Authorization') && localStorage.getItem('userId'))) { 
        message = 'Logout'
      } else if (!this.state.userId || !localStorage.getItem('Authorization') || !localStorage.getItem('userId')) {
        message = 'Login'
      }
    return message
  }
  
  
  render() {
    history.listen((location, action) => {
      // console.log(`Current URL is ${location.pathname}`)
    })
    

    let backdrop
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>
    }

    return (
        <div className="App">
          <Toolbar isLoggedIn={this.loginOrLogout()} userCheck={this.state.userId} drawerClickedHander={this.drawerToggleClickHandler}/>

          <TopDrawer 
            isLoggedIn={this.loginOrLogout()}  
            show={this.state.sideDrawerOpen}
          />

          {backdrop}
          <main>
          
              <Switch> 
                <Route path="/" exact component={Home} />
                {/* <Route path="/syncs" exact component={AllSyncs} /> */}
                <Route path="/new-post" exact component={NewPost} />
                <Route path="/all-posts/"  exact component={AllPosts} />
                <Route path="all-post/filter" exact component={AllPosts} />
                <Route path="/posts/:id" exact component={FullPost} />
                <Route path="/users/login" exact 
                  render={() => 
                    // <Login loginCheck={this.loginOrLogout} />} 
                    <Login userID={this.state.userId} loginCheck={() => {this.userIdSessionHandler()}}/>} 

                />

                <Route render={() => <h1>Oops! <br></br>404 Error, Page Not Found.</h1>}/>
              </Switch>
            
          </main>
        </div>
    );
  }
}

export default App;
