import React, { Component } from 'react';
import './AllPosts.css'
// import Sync from './Sync/Sync'
import axios from '../../axios';
import Post from '../Post/Post'
// import { Z_BLOCK } from 'zlib';
// import { runInThisContext } from 'vm';

class AllPosts extends Component {
  
  state = {
    filter: [],
    posts: [],
    error: false
  }

  // handleData = this.handleData.bind(this);

  // Once everything is mounted get the post data.
  componentDidMount() {
    console.log("Array Check in ComponentDidMount", Array.isArray(this.state.filter))
    const urlParam = this.state.filter.length > 0 ? '/posts/filter/' + this.state.filter : '/posts'
    // console.log(this.state.filter.length > 0 ? true : false)

    // axios.get('/posts')
    if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id))
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
    this.props.history.push({pathname: 'posts/' + id})
  }
  
  filterPostsByTag = (e) => {
    let arr = [...this.state.filter]
    
    if(!arr.includes(e.target.textContent)) {
      arr.push(e.target.textContent)
      this.setState({filter: arr})
    }
  }

 componentDidUpdate(prevProps, prevState) {
   if (prevState.filter !== this.state.filter) {
    
    console.log(this.state.filter)

    // if (this.state.filter.length > 0) {
    //   axios.get('/posts/filter/' + this.state.filter[0])
    //   .then((response => {
    //     let posts = []   
    //       // console.log("RESPONSE DATA: ")
    //       // console.log(response.data.posts)
  
    //       // Loop through the JSON object and put each post object in an array.
    //       for (let x in response.data.posts) {
    //         posts.push(response.data.posts[x])
    //       }
  
    //       // Get an actual copy(not reference) to the JSON object
    //       const updatedPosts = posts.map(post => {
    //         return {
    //           ...post
    //         }
    //       })
  
    //       // Set state to the fetched posts object
    //       this.setState({posts:updatedPosts})
    //   })
    //   )
    //   // Catch any errors 
    //   .catch(error => { // Check for any error.  Handle this in the future.
    //     this.setState({error: error})
    //     console.log(error) 
    //     console.log(axios.head) 
    //   })
    // } else {
    //   axios.get('/posts')
    //   .then((response => {
    //     let posts = []   
    //       // console.log("RESPONSE DATA: ")
    //       // console.log(response.data.posts)
  
    //       // Loop through the JSON object and put each post object in an array.
    //       for (let x in response.data.posts) {
    //         posts.push(response.data.posts[x])
    //       }
  
    //       // Get an actual copy(not reference) to the JSON object
    //       const updatedPosts = posts.map(post => {
    //         return {
    //           ...post
    //         }
    //       })
  
    //       // Set state to the fetched posts object
    //       this.setState({posts:updatedPosts})
    //   })
    //   )
    //   // Catch any errors 
    //   .catch(error => { // Check for any error.  Handle this in the future.
    //     this.setState({error: error})
    //     console.log(error) 
    //     console.log(axios.head) 
    //   })
    // }
   
  } 
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

  // handleData(data) {
  //   this.setState({
  //     filter: null
  //   })
  // }

  removeFilterHandler(event) {
    console.log(event)
    console.log(this.state)
    this.setState({
      filter: []
    })
  }

  render () {
    // A default post display if there is an error.
    let posts = <p>Opps! Something went wrong with your request.</p>

    const getFilters = () => { 
      const filterArray = []
      if (this.state.filter.length > 0) {
        this.state.filter.forEach((tag) => {
          if (filterArray.indexOf(tag) === -1) {
            filterArray.push(<p key={tag} style={{display:'inline-block', fontFamily: '\'Montserrats\', sans-serif', fontWeight: 'bold', color: '#4d4d4d'}}> <span className='tag_block' onClick={this.removeFilterHandler.bind(this)}>{tag}</span></p>)
          }
        })
        // console.log(this.state.filter)
        return filterArray
      }
      if (this.state.filter.length === 0) {
        return null
      }
    }

    const filterArray = getFilters()
    
      // this.state.filter.length > 0 ? <p style={{display:'block', fontFamily: '\'Montserrats\', sans-serif', fontWeight: 'bold', color: '#4d4d4d'}}>Filtering: <span className='tag_block' onClick={this.removeFilterHandler.bind(this)}>{this.state.filter}</span></p> : null
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
        {/* {filterTag} */}
        {filterArray}
        {posts}
      </div> 
    )
  }
}

export default AllPosts

