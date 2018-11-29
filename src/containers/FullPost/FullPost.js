import React, {Component} from 'react'
import axios from '../../axios'
import './FullPost.css'


class FullPost extends Component {
  state = {
    test: "TEST",
    loadedPost: null
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id))
      axios.get('/posts/' + this.props.match.params.id) // This retrieves the object at that location
        .then(response => {
          let newData = {
            ...response.data
          }
          this.setState({loadedPost: newData})
          console.log(this.state.loadedPost)
        })
        .catch(err => {
          console.log("[ERROR]" , err)
        })
    }
  }

  render() {
    let sync = <p style={{textAlign: 'center'}}>Loading</p>

    // if (this.props.id) {
    //   sync = <p>Loading</p>
    //   // sync = <h1>Full sync!{this.props.match.params.id}</h1>
    // }

    if (this.state.loadedPost) {
      let syncData = this.state.loadedPost.doc
      console.log("TEST" + syncData)
     
      const tagLoop = (arr) => { // FIX THIS CHECK TO SEE IF THERE ARE ACTUALLY TAGS OR NOT
        if (Array.isArray(arr)) {
          return arr.join(' | ')
        } else {
          return arr
        }
      }

      sync = (
        <div className="FullPost">
          <h1>{syncData.title}</h1>
          <h3><span className='bold'>By: </span>{syncData.author} - <span className="fullpost__date"> {syncData.createdAt} </span ></h3>
          <p className='bold'><span className='bold'>Tags: </span> <span style={{fontSize: '1.3rem'}}>{tagLoop(syncData.tags)}</span></p>
          <p><span className='tab'> </span>{syncData.description}</p>
          <p><span className='tab'> </span> Body - {syncData.bodyText}</p>
        </div>
      )
    }
    return sync
  }
}

export default FullPost