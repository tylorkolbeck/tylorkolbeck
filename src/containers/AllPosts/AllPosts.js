import React, { Component } from 'react';
import './AllPosts.css'
// import Sync from './Sync/Sync'
import axios from '../../axios'
import Post from '../Post/Post'
// import { Z_BLOCK } from 'zlib';
// import { runInThisContext } from 'vm';
import history from '../../history'

class AllPosts extends Component {
  _ismounted = false;
  state = {
    filter: [],
    posts: [],
    error: false
  }

  // handleData = this.handleData.bind(this);

  // Once everything is mounted get the post data.
  componentDidMount() {
    this._ismounted = true
    const urlParam = this.state.filter.length > 0 ? '/posts/filter/' + this.state.filter : '/posts'

    if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id))
    axios.get(urlParam)
      .then((response) => {
        let posts = []   
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
        if (this._ismounted) {
          this.setState({posts:updatedPosts})
        }
        

        // TODO: #################### SET THIS TOKEN IN LOCAL STORAGE ##########################
        // Set the authorization token here.  This is temporary and will be set when logging in
      })
      
      // Catch any errors 
      .catch(error => { // Check for any error.  Handle this in the future.
        if (this._ismounted) {
          this.setState({error: error})
          console.log(error) 
          console.log(axios.head) 
        }
       
      })
  }

  componentWillUnmount() {
   this._ismounted = false
  }

  postSelectedHandler = (id) => {
    history.push('posts/' + id)
  }
  
  filterPostsByTag = (e) => {
    let arr = [...this.state.filter]
    
    if(!arr.includes(e.target.textContent)) {
      arr.push(e.target.textContent.toLowerCase())
      this.setState({filter: arr})
    }
  }

 componentDidUpdate(prevProps, prevState) {
   if (prevState.filter !== this.state.filter) {
    
    let tagString = '?'
    let i = 1
    
    this.state.filter.forEach((tag)=> {
      tagString += 'filterId' + i + '=' + tag + '&' 
      i++
    })
    
    tagString = tagString.slice(0, tagString.length -1)

    if (this.state.filter.length) {
      axios.get('/posts/filter' + tagString.toLowerCase())
      .then((response => {
        let posts = []   
  
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
      )
      // Catch any errors 
      .catch(error => { // Check for any error.  Handle this in the future.
        this.setState({error: error})
        console.log(error) 
        console.log(axios.head) 
      })
    }
    else if (this.state.filter.length === 0) {
      axios.get('/posts')
      .then((response => {
        let posts = []   
  
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
      )
      // Catch any errors 
      .catch(error => { // Check for any error.  Handle this in the future.
        this.setState({error: error})
        console.log(error) 
        console.log(axios.head) 
      })
    }
   
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

  removeFilterHandler(event) {
    let oldTagsArray = [...this.state.filter]
    let pos = oldTagsArray.indexOf(event.target.textContent)
    oldTagsArray.splice(pos, 1)
    const newState = oldTagsArray
    this.setState({
      filter: newState
    })
  }

  render () {
    // A default post display if there is an error.
    let posts = <p>Opps! Something went wrong with your request.</p>

    const filterSpan = () => {
      if (this.state.filter.length > 0) {
        return <span style={{fontFamily: '\'Montserrat\', sans-serif', fontWeight: '400', fontSize: '1rem'}}>Filtering By: </span>
      }
    }

    const getFilters = () => { 
      const filterArray = []
      if (this.state.filter.length > 0) {
        this.state.filter.forEach((tag) => {
          if (filterArray.indexOf(tag) === -1) {
            filterArray.push(
            <p key={tag} className='tag_block' onClick={this.removeFilterHandler.bind(this)}> 
              <span>{tag}</span>
            </p>)
          }
        })
     
        return filterArray
      }
      if (this.state.filter.length === 0) {
        return null
      }
    }

    // If there are no errors then display the posts.
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        const date = post.createdAt
        const key = post._id
        return ( 
        <Post 
          key={key}
          userId={this.props.userId}
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
      
        {filterSpan()}
        {getFilters()}
        {posts}
      </div> 
    )
  }
}

export default AllPosts

