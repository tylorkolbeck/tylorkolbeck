import React, { Component } from 'react';
import './AllPosts.css'
// import Sync from './Sync/Sync'
import axios from '../../axios'
import Post from '../Post/Post'
import history from '../../history'
import { dateConversion } from '../../MyModules/my_module'



class AllPosts extends Component {
  _ismounted = false;
  state = {
    tagsArray: [],
    numOfPosts: 0,
    filter: [],
    posts: [],
    error: false,
    adminMode: false
  }

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


        let reversedPosts = updatedPosts.reverse()


        // Set state to the fetched posts object
        if (this._ismounted) {
          this.setState({posts:reversedPosts})
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

  postSelectedHandler = (event, id) => {
    history.push('posts/' + id)
  }
  
  filterPostsByTag = (e) => {
    let arr = [...this.state.filter]
    
    if(!arr.includes(e.target.textContent)) {
      arr.push(e.target.textContent.toLowerCase())
      this.setState({filter: arr})
    }
  }

  filterByDropDown = (e) => {
    let arr = [...this.state.filter]
    arr.push(e.target.value.toLowerCase())
    this.setState({filter: arr})
    // let filteredArr = arr.filter((tag) => tag !== e.target.value)
    // console.log(filteredArr)
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
      // axios.get('/posts')
      axios.get('https://api.thedailyfunc.com/posts')
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
        return <span style={{fontFamily: '\'Montserrat\', sans-serif', fontWeight: '400', fontSize: '1rem', marginLeft: '10px'}}>Contains: </span>
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

    const editSlider = () => {
      if (!this.props.userId) {
        return null
      }
      if (this.props.userId) {
        return (
          <div style={{display: 'inline', float: 'left', marginRight: '10px'}}>
            <label className="allposts__edit_slider_label">Edit Mode </label>
            <label className="allposts__edit_switch">
              <input type="checkbox" onChange={(event) => this.setState({adminMode: event.target.checked})}/>
            <span className="slider round"></span>
            </label>
          </div>
          
        )
      }
    }

      
    
    // If there are no errors then display the posts.
    if (!this.state.error) {
      let postsToDisplay
      if(this.state.adminMode) {
        postsToDisplay = this.state.posts
      } else {
        postsToDisplay = this.state.posts.filter((post) => {
          return post.isPublic
        })
      }

      posts = postsToDisplay.map(post => {
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
          date = {dateConversion(date, 'y,m,d')}
          tags={post.tags} // CHANGED
          clicked={(event)=> this.postSelectedHandler(event, post._id)}
          location={this.state.location}
          tagFilter={this.filterPostsByTag}
          isPublic={post.isPublic}
          adminMode={this.state.adminMode}
        />
        )
      })
    }

    // Make an array of all the tags.
    this.state.posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (this.state.tagsArray.indexOf(tag.trim(' ')) === -1 && (tag.trim(' ') !== '' )) {
          this.state.tagsArray.push(tag.trim(' '))
        }
      })
    })


  let tagDropDown = this.state.tagsArray.map((tag) => <option key={tag}>{tag}</option>)

    return (
     <div>
     {editSlider()}
     
          
          {/* <select className="allPosts__tag_filter_dropdown" onChange={(e) => this.filterByDropDown(e)}style={{display: 'inline'}}>
              <option>Filter</option>
              {tagDropDown}
          </select> */}
          {filterSpan()}
          {getFilters()}

         

        <div className='AllPostsContainer'>
          {posts}
        </div> 

      </div>
    )
  }
}

export default AllPosts

