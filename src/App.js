import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Toolbar from './components/Toolbar/Toolbar'
import TopDrawer from './components/TopDrawer/TopDrawer'
import Backdrop from './components/Backdrop/Backdrop'
import AllSyncs from './containers/Syncs/AllSyncs'
import Home from './containers/Home/Home'
import FullPost from './containers/FullPost/FullPost'
import NewPost from './containers/NewPost/NewPost'


class App extends Component {
  state = {
    sideDrawerOpen: false,
    auth: true
  }
  
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

  render() {
    let backdrop

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>
    }

    return (
      <BrowserRouter basename="/">
        <div className="App">

          {/* All the navigation stuff */}
          <Toolbar drawerClickedHander={this.drawerToggleClickHandler}/>
          <TopDrawer show={this.state.sideDrawerOpen}/>
          {backdrop}

          {/* The main part of the page */}
          <main>
            {/* The different routes for the website */}
            <Switch> 
              <Route path="/" exact component={Home} />
              <Route path="/syncs" exact component={AllSyncs} />
              <Route path="/new-post" exact component={NewPost} />
             
              <Route path="/sync/:id" component={FullPost} />
              
              {/* Catch any unknown routes */}
              <Route render={() => <h1>Oops! <br></br>404 Error, Page Not Found.</h1>}/>

              {/* REDIRECT IF THE ROUTE IS UNKOWN */}
              {/* <Redirect from="/" to="/syncs" />  */}
            </Switch>
            
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
