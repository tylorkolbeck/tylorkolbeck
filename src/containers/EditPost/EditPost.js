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
    // ['title','author','tags', 'category', 'description', 'bodyText', 'isPublic']
    postItems: {
      title: false,
      author: false,
      tags: false,
      category: false,
      description: false,
      bodyText: false,
      isPublic: false,
      _id: false,
      // userId: false
    },

    localStoragePrefix: 'new-',
    submitted: false,
    userId: localStorage.getItem('userId'),
    postId: this.props.match.params.postId ? this.props.match.params.postId : 'new',
    loadedPost: false,
    _id: '',
    title: '',
    author: '',
    tags:  [],
    category: '',
    description: '',
    bodyText: '',
    postImages: [],
    isPublic: false,
  }


  componentDidMount() {
    // If there is a postId then assume that we are editing a post. 
    if (this.state.postId && this.props.match.params.postId) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.postId)) {
        this.getPostToEdit()
        this.setState({localStoragePrefix: this.state.postId + '-'})
        this.checkLocalStorage()
        console.log('Not making a new post?')
      }
    }
    // If there is not postId then assume that we are creating a new post. 
    if (!this.props.match.params.postId) {
      console.log("MAKING A NEW POST?")
      this.checkLocalStorage()
    }
  }
  
  updateStateHandler(event) {
    // let fieldValue = event.target.value
    console.log(this.state)
    let fieldValue = event.target.name === 'tags' ?  event.target.value.toLowerCase().split(',') : event.target.value
    let fieldName = event.target.name
    this.setState({[fieldName]: fieldValue})
    localStorage.setItem(`${this.state.localStoragePrefix}${fieldName}`, fieldValue)
  }

  // Checks local storage for any unsaved progress.
  checkLocalStorage() {
    let storageDataObj = {...this.state.postItems}
    for(let key in storageDataObj) {
      if (key === 'tags' && localStorage.getItem(`${this.state.localStoragePrefix}${key}`)) {
          storageDataObj[key] = true
          this.setState({[key]: localStorage.getItem(`${this.state.localStoragePrefix}${key}`).split(',')})
      }

      else if (localStorage.getItem(`${this.state.localStoragePrefix}${key}`)) {
        storageDataObj[key] = true
        this.setState({[key]: localStorage.getItem(`${this.state.localStoragePrefix}${key}`), postItems: storageDataObj})
      }
    }
  }


  // Fetch the post to edit when a postId is in the URL(checked above)
  getPostToEdit() {
    axios.get('/posts/' + this.props.match.params.postId) 
    .then(res => {
        for (let key in this.state.postItems) {
          this.setState({[key]: res.data.doc[key]})
        }
        this.checkLocalStorage()
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
      tags: this.state.tags.map((tag) => tag.trim()),
      category: this.state.category,
      postImages: [],
      isPublic: this.state.isPublic,
      userId: this.state.userId
    }

    // If editing an array then run the patch.
    if (this.state.postId === this.state._id) {
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
          this.setState({submitted: true}) 
          for (let key in data) {
            localStorage.removeItem(`${this.state.localStoragePrefix}${key}`)
          }
        })
        .then(() =>  history.push('/all-posts'))
        .catch(err => {
          console.log("[POST - ERROR] - ", err)
        })
    } else { // Then this is a new post. 
        const formData = new FormData()
        for ( const key in this.state ) {
          formData.append(key, data[key])
        }

        // The HTTP Request
        axios({
          method: 'post',
          url: 'http://localhost:3000/posts',
          data: formData, 
      
          headers: {
            'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'multipart/form-data',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' 
          },
        })
          .then(res => {
            // const fieldNames = ['title', 'author', 'bodyText', 'description', 'tags', 'category']

            // remove from localStorage
            for (let key in data) {
              localStorage.removeItem(`${this.state.localStoragePrefix}${key}`)
            }
          })
          .then(() =>  history.push('/all-posts'))
      }
        
  }

  showPostForm = () => {
    console.log(this.state.userId)
    let showNewPostForm;

    if (this.state.userId === process.env.REACT_APP_ADMIN_USERID) {
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
    return showNewPostForm
  }
  
  render () {
    
    return (
      <div>
        {/* {showNewPostForm} */}
        {this.showPostForm()}
      </div>
    )
  }
}

export default EditPost