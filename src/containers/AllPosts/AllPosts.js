import React, { Component } from 'react';
import './AllPosts.css'
// import Sync from './Sync/Sync'
import axios from '../../axios';
import Post from '../Post/Post'

class AllPosts extends Component {
  state = {
    posts: [],
    error: false
  }

  // Once everything is mounted get the post data.
  componentDidMount() {
    const urlParam = this.props.match.params.filterTag ? '/posts/filter/' + this.props.match.params.filterTag : '/posts'
    // axios.get('/posts')
    console.log(this.props.match.params.filterTag)
    // axios.get('posts/filter/python')
    axios.get(urlParam)


      .then((response) => {
        let posts = []   
        console.log("RESPONSE DATA: ")
        console.log(response.data.posts)

        // Loop through the JSON object and put each post object in an array.
        for (let x in response.data.posts) {
          posts.push(response.data.posts[x])
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
    this.props.history.push({pathname: 'posts/' + id})
    // this.props.history.goBack()
    // console.log(this.props.history)
  }

  dateConversion = (ISODate) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateArray = []
    const date = new Date(ISODate);
    dateArray.push(date.getFullYear())
    dateArray.push(months[date.getMonth()])
    dateArray.push(date.getDate())

    //  + '-' + (date.getMonth()+1) + '-' + date.getDate();
    return dateArray
  }

  render () {
    // A default post display if there is an error.
    let posts = <p>Opps! Something went wrong with your request.</p>
    // If there is no error then display the posts.
    if (!this.state.error) {
      // console.log(this.state.error)
      posts = this.state.posts.map(post => {
        // console.log(post.createdAt)
        const date = post.createdAt
        const key = post._id
        return ( 
        <Post 
          key={key}
          id={post._id}
          title={post.title}
          author={post.author}
          description={post.description}
          date = {this.dateConversion(date)}
          tags={post.tags}
          clicked={()=> this.postSelectedHandler(post._id)}
        />
        )
      })
    }
    

    return (
      <div className='AllPostsContainer'>
        {posts}
      </div>
    )
  }
}

export default AllPosts

