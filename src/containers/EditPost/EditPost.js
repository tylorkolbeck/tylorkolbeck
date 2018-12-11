import React, { Component } from 'react'
import './EditPost.css'
import history from '../../history'
import axios from 'axios';
// import ReactHtmlParser from 'react-html-parser'
// import btns from '../../MyModules/PostFormatter/postFormatter'
import PostForm from '../../components/PostForm/PostForm'

 // TODO: SHOW THAT THERE ARE UNSAVED CHANGES AND SHOW HAVE A WAY TO DISCARD ALL CHANGES
//  TODO: FIX EDGE CASE WHERE I LOG IN AND THERE IS NO WHERE TO GO BACK TO. THEN JUST GO TO HOME PAGE

class EditPost extends Component  {
  state = {
    localStoragePrefix: false,
    submitted: false,
    userId: localStorage.getItem('userId'),
    postId: this.props.match.params.postId ? this.props.match.params.postId : '',
    loadedPost: false,
    _id: '',
    title: '',
    author: '',
    tags:  localStorage.getItem('tags') ? [...localStorage.getItem('tags')] : [],
    category: '',
    description: '',
    bodyText: '',
    postImages: [],
    isPublic: false
  }


  componentDidMount() {
    if (this.state.postId) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.postId)) {
        this.getPostToEdit()
      } else {
        console.log("MAKING A NEW POST?")
      }
    }

    console.log(this.state.tags)
  }

  
  updateStateHandler(event) {
    let fieldValue = event.target.name === 'tags' ?  event.target.value.toLowerCase().split(',') : event.target.value

    let fieldName = event.target.name
    // let fieldValue = event.target.value
    this.setState({[fieldName]: fieldValue})


    localStorage.setItem(`${this.state.localStoragePrefix}-${fieldName}`, fieldValue)
  }


  getPostToEdit() {
    let localStoragePrefix = 'editPost-'

    axios.get('/posts/' + this.props.match.params.postId) 
      
    .then(res => {
        let postItems = {
          title: '',
          author: '',
          tags: [],
          category: '',
          description: '',
          bodyText:'',
          isPublic: '',
          _id: ''
        }

        for (let key in postItems) {
          // if (key === 'tags') {
            
          //   res.data.doc.tags.forEach((tag) => postItems.tags.push(tag))
          //   // postItems[key].push(res.data.doc[key])
            
          // } else 
          
          // if (key !== 'tags') {
            // console.log("TEST LOCAL STORAGE: ", `${localStoragePrefix}${this.state.postId}-${key}`)
        
          postItems[key] = localStorage.getItem(`${localStoragePrefix}${this.state.postId}-${key}`) ? localStorage.getItem(`${localStoragePrefix}${this.state.postId}-${key}`) : res.data.doc[key]
          
          // postItems[key] === 'tags' ? localStorage.getItem(`${localStoragePrefix}${this.state.postId}-${key}`.split(',')) :  ()
          
          // } 
        }
  
        this.setState({...postItems, localStoragePrefix: localStoragePrefix+this.state.postId, loadedPost: true, userId: localStorage.getItem('userId')})
      })
      .catch(err => {
        console.log(err)
      })
  }


  togglePublic = () => {
    this.setState({isPublic: !this.state.isPublic})
    console.log(this.state.isPublic)
  }


  // When form is submitted then set the data and patch request to the DB.
  postDataHandler = () => {
    const data = {
      title: this.state.title,
      author: this.state.author,
      bodyText: this.state.bodyText,
      description: this.state.description,
      tags: Array.isArray(this.state.tags) ? this.state.tags : this.state.tags.split(','),
      category: this.state.category,
      postImages: [],
      isPublic: this.state.isPublic,
    }

    let dataArray = []

    for (let key in data) {
      dataArray.push({
        propName: key, value: data[key]
      }) 
    }

    axios({
      method: 'patch',
      url: 'http://localhost:3000/posts/' + this.state._id,
      data: dataArray, 
   
      headers: {
        'Authorization': localStorage.getItem('Authorization'),
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        console.log(res.err)
        

        this.setState({submitted: true}) 
        for (let key in data) {
          localStorage.removeItem(`${this.state.localStoragePrefix}-${key}`)
        }
      })
      .then(() =>  history.push('/all-posts'))
      .catch(err => {
        console.log("[POST - ERROR] - ", err)
      })
  }
  
  render () {
    let showNewPostForm
    
    if (this.state.userId === process.env.REACT_APP_ADMIN_USERID) {
      console.log("Good user check")
      showNewPostForm = 
        <PostForm 
          title={this.state.title}
          author={this.state.author}
          tags={this.state.tags}
          category={this.state.category}
          description={this.state.description}
          bodyText={this.state.bodyText}
          isPublic={this.state.isPublic}
          togglePublic={this.togglePublic.bind(this)}
          updateStateHandler={this.updateStateHandler.bind(this)}
          postDataHandler={this.postDataHandler.bind(this)}
        />
    } else if (this.state.userId !== process.env.REACT_APP_ADMIN_USERID) {
      showNewPostForm = <div>You do not have permission to create a new post.  Please login.</div>
    } else {
      showNewPostForm = <div>Error</div>
    }

    return (
      <div>
        {showNewPostForm}
      </div>
    )
  }
}

export default EditPost