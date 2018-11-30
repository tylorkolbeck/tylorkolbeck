import React, { Component } from 'react';
// import './AllPosts.css'
// import Sync from './Sync/Sync'
import axios from '../../axios';
import Post from '../Post/Post'

class AllPosts extends Component {
  
  state = {
    filter: this.props.match.params.filterTag,
    posts: [],
    error: false
  }

  handleData = this.handleData.bind(this);

  // Once everything is mounted get the post data.
  componentDidMount() {
    const urlParam = this.props.match.params.filterTag ? '/posts/filter/' + this.props.match.params.filterTag : '/posts'
    // axios.get('/posts')
    // console.log(this.props.match.params.filterTag)
    // axios.get('posts/filter/python')


    axios.get(urlParam)


      .then((response) => {
        let posts = []   
        // console.log("RESPONSE DATA: ")
        // console.log(response.data.posts)

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
    this.props.history.replace({pathname: 'posts/' + id})
  }
  
  filterPostsByTag = (e) => {
    // console.log(e.target.textContent)
    this.props.history.replace({pathname: e.target.textContent})
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

  handleData(data) {
    this.setState({
      fromChild: data
    })
  }

  render () {
    // A default post display if there is an error.
    let posts = <p>Opps! Something went wrong with your request.</p>
    // If there is no error then display the posts.
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
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
          location={this.state.location}
          tagFilter={this.filterPostsByTag}
        />
        )
      })
    }
    

    return (
      <div className='AllPostsContainer'>
      <p> Filtering: <span className='tag_block'>{this.state.filter}</span></p>
        {posts}
      </div>
    )
  }
}

export default AllPosts

