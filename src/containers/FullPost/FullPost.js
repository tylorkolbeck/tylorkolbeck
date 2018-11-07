import React, {Component} from 'react'
import axios from '../../axios'
import './FullPost.css'
import firebase from '../../firebase'




class FullPost extends Component {
  state = {
    loadedPost: null
  }

  componentDidMount() {


    // let posts = firebase.database().ref('posts')
    // const query = posts
    //                 .orderByChild('id')
    //                 .equalTo(this.props.match.params.id)

                    
    // query.on('value', snap => {
    //   let newData = {
    //     ...response.data
    //   }
    //   this.setState({loadedPost: newData})
    // })
    
    if (this.props.match.params.id) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id))
      axios.get('/posts/' + this.props.match.params.id + '.json') // This retrieves the object at that location
        .then(response => {
          let newData = {
            ...response.data
          }
          this.setState({loadedPost: newData})
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
      let syncData = this.state.loadedPost
     
      const tagLoop = (arr) => {
        if (arr) {
          return syncData.tags.join(' / ')
        }
      }

      sync = (
        <div className="FullPost">
          <h1>{syncData.title}</h1>
          <h3><span className='bold'>By:</span>{syncData.author} <span > - {syncData.date}</span></h3>
          <p className='tags'>Tags: <span style={{fontWeight: 400, fontSize: '1rem', fontStyle: 'italic'}}>{tagLoop()}</span></p>
          <p><span className='tab'> </span>{syncData.description}</p>
          <p><span className='tab'> </span> Body - {syncData.body}</p>
        </div>
      )
    }
    return sync
  }

  

}

export default FullPost