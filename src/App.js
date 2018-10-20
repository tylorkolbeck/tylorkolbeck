import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css';
import Toolbar from './components/Toolbar/Toolbar'
import TopDrawer from './components/TopDrawer/TopDrawer'
import Backdrop from './components/Backdrop/Backdrop'
import AllSyncs from './containers/Syncs/AllSyncs'
import NewPost from './containers/NewPost/NewPost'

class App extends Component {
  state = {
    sideDrawerOpen: false
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
      <BrowserRouter>
        <div className="App">

          {/* All the navigation stuff */}
          <Toolbar drawerClickedHander={this.drawerToggleClickHandler}/>
          <TopDrawer show={this.state.sideDrawerOpen}/>
          {backdrop}

          {/* The main part of the page */}
          <main>
            <Route path="/" exact render={() => <h1 style={{fontFamily: 'Montserrat', fontWeight: '400'}}>"The only stupid questions are the questions that are not followed up with some research."</h1>} />
            <Route path="/syncs" exact component={AllSyncs} />
            <Route path="/new-post" exact component={NewPost} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
