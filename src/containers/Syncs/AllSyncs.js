import React, { Component } from 'react';
import './AllSyncs.css'
import Sync from './Sync/Sync'

class AllSyncs extends Component {

  render () {
    return (
      <div className="AllSyncs">
        <Sync />
        <Sync />
        <Sync />
      </div>
    )
  }
}

export default AllSyncs

