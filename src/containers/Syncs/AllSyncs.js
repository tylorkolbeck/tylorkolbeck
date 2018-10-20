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
    axios.get('/posts.json')
      .then(response => {
        const posts = response.data

        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Tylor Kolbeck',
            date: '18 Jan 18',
            description: 'Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
            tags: ['Python', 'Javascript', 'React', 'Coding']
          }
        })
        // Set state to new posts
        this.setState({posts:updatedPosts})
      })
      .catch(error => { // Check for any error.  Handle this in the future.
        this.setState({error: error})
        console.log(error) 
      })
  }

  render () {
    // A default post display if there is an error.
    let syncs = <p>Opps! Something went wrong with your request.</p>
    
    // If there is no error then display the posts.
    if (!this.state.error) {
      syncs = this.state.posts.map(post => {
        return <Sync 
          key={post.id}
          title={post.title}
          author={post.author}
          description={post.description}
          body={post.body}
          date={post.date}
          tags={post.tags}/>
      })
    }

    return (
      <div className="AllSyncs">
        {syncs}
        {/* <Sync syncTitle='Intro To A payment System'/>
        <Sync syncTitle='First Steps With The Cache API'/>
        <Sync syncTitle='Getting Started With Service Workers'/> */}
      </div>
    )
  }
}

export default AllSyncs

