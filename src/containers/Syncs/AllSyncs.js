import React, { Component } from 'react';
import './AllSyncs.css'
import Sync from './Sync/Sync'
import axios from '../../axios';

class AllSyncs extends Component {
  state = {
    posts: [],
    error: false
  }

  // Once everything is mounted get the post data.
  componentDidMount() {
    // Fetch the posts using the axios instance which holds base URL
    axios.get('/posts.json') //FOR FIREBASE
    // axios.get('/posts') // FOR JSON PLACEHOLDER
      .then((response) => {
        let posts = []   

        // Loop through the JSON object and put each post object in an array.
        for (let x in response.data) {
          posts.push(response.data[x])
        }

        // Get an actual copy(not reference) to the JSON object
        const updatedPosts = posts.map(post => {
          return {
            ...post
          }
        })

        // Set state to the fetched posts object
        this.setState({posts:updatedPosts})
      })

      // Catch any errors 
      .catch(error => { // Check for any error.  Handle this in the future.
        this.setState({error: error})
        console.log(error) 
        console.log(axios.head) 
      })
  }

  postSelectedHandler = (id) => {
    // Navigating programmatically to use to navigate after somethign is complete
    this.props.history.push({pathname: 'sync/' + id})
    // this.props.history.goBack()
    console.log(this.props.history)
  }

  render () {
    // A default post display if there is an error.
    let syncs = <p>Opps! Something went wrong with your request.</p>
    
    // If there is no error then display the posts.
    if (!this.state.error) {
      // console.log(this.state.error)
      syncs = this.state.posts.map(post => {
        return ( 

        <Sync 
          key={post.id}
          id={post.id}
          title={post.title}
          author={post.author}
          description={post.description}
          body={post.body}
          date={post.date}
          tags={post.tags}
          clicked={()=> this.postSelectedHandler(post.id)}
          />
        )
      })
    }

    return (
      <div className="AllSyncs">
        {syncs}
      </div>
    )
  }
}

export default AllSyncs

