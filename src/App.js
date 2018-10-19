import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar'
import TopDrawer from './components/TopDrawer/TopDrawer'
import Backdrop from './components/Backdrop/Backdrop'

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
      <div className="App">

        <Toolbar drawerClickedHander={this.drawerToggleClickHandler}/>
        <TopDrawer show={this.state.sideDrawerOpen}/>
        {backdrop}

        <main>
          <p>This is the page content</p>
        </main>
        


      </div>
    );
  }
}

export default App;
