import React, { Component } from 'react'
import './EditPost.css'
import history from '../../history'
import axios from 'axios';
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
      postImages: [],
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

    unsavedChanges: false,

    selectedFiles: [],

    loading:false
  }


  componentDidMount() {
    // If there is a postId then assume that we are editing a post. 
    if (this.state.postId && this.props.match.params.postId) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.postId)) {
        this.getPostToEdit()
        this.setState({localStoragePrefix: this.state.postId + '-'})
        this.checkLocalStorage()
      }
    }
    // If there is not postId then assume that we are creating a new post. 
    if (!this.props.match.params.postId) {
      this.checkLocalStorage()
    }
  }
  
  updateStateHandler(event) {
    // let fieldValue = event.target.value
    let fieldValue = event.target.name === 'tags' ?  event.target.value.toLowerCase().split(',') : event.target.value
    let fieldName = event.target.name
    this.setState({[fieldName]: fieldValue})
    localStorage.setItem(`${this.state.localStoragePrefix}${fieldName}`, fieldValue)
    console.log(this.state)
  }

  // Checks local storage for any unsaved progress.
  checkLocalStorage() {
    let storageDataObj = {...this.state.postItems}
    for(let key in storageDataObj) {
      if (key === 'tags' && localStorage.getItem(`${this.state.localStoragePrefix}${key}`)) {
          this.setState({unsavedChanges: true})
          storageDataObj[key] = true
          this.setState({[key]: localStorage.getItem(`${this.state.localStoragePrefix}${key}`).split(',')})
      }

       else if (key === 'postImages' && localStorage.getItem(`${this.state.localStoragePrefix}${key}`)) {
        this.setState({[key]:localStorage.getItem(`${this.state.localStoragePrefix}${key}`).split(','),unsavedChanges: true})
      }

      else if (localStorage.getItem(`${this.state.localStoragePrefix}${key}`)) {
        this.setState({unsavedChanges: true})
        storageDataObj[key] = true
        this.setState({[key]: localStorage.getItem(`${this.state.localStoragePrefix}${key}`), postItems: storageDataObj})
      }
    }
  }


  // Fetch the post to edit when a postId is in the URL(checked above)
  getPostToEdit() {
    this.setState({loading: true})
    axios.get('/posts/' + this.props.match.params.postId) 
    .then(res => {
        for (let key in this.state.postItems) {
          this.setState({[key]: res.data.doc[key]})
        }
        console.log(this.state)
        this.checkLocalStorage()
        this.setState({loading: false})
      })
      .catch(err => {
        console.log(err)
      })
  }

  togglePublic = () => {
    this.setState({isPublic: !this.state.isPublic})
  }

  fileChangedHandler = event => {
    if (event.target.files[0]) {
      let oldFileObject = [...this.state.selectedFiles]
      let fileObject = {}
      fileObject.file = event.target.files[0]
      fileObject.name = Date.now().toString() + "-" + event.target.files[0].name
      fileObject.location = ''
  
      this.setState({
        selectedFiles: [...oldFileObject, fileObject]
  
      }, function() {          
          this.fileUploadHandler(fileObject) 
        })
    } else {
      return
    }
   
  }

  fileUploadHandler = (fileObject) => {

    


    if (fileObject.file) {
      const formData = new FormData()
      formData.append('postImages', fileObject.file, fileObject.name)
      axios.post('https://api.thedailyfunc.com/posts/image-upload', formData, {
        onUploadProgress: progressEvent => {
          console.log(Math.trunc(progressEvent.loaded / progressEvent.total * 100).toString() +  '%')
        }
      })
      .then((res)=> {
        const fileObjToUpdate = this.state.selectedFiles.find(fileObj => fileObj.name === fileObject.name );
        fileObjToUpdate.location = res.data.imageUrl[0].location
        let oldState = [...this.state.postImages]
        oldState.push(res.data.imageUrl[0].location)
        this.setState({postImages: oldState} ,function() {
          localStorage.setItem(this.state.localStoragePrefix + 'postImages', this.state.postImages)
        })
      })
    } else {
      return
    }
  }

  deleteImageHandler = (event) => {
    let oldState = [...this.state.selectedFiles]
    let oldUrls = [...this.state.postImages]
    let newState = oldState.filter(url => url.name !== event.target.alt)

    let newUrls = oldUrls.filter((url) => url !== event.target.src)

    this.setState({selectedFiles: newState, postImages: newUrls})
    try {
      oldUrls.splice(oldUrls.indexOf(event.target.src))
      localStorage.setItem(this.state.localStoragePrefix + 'postImages', oldUrls)
    }
    catch(err) {
      console.log('Error removing url from url array', err)
    }
    finally {
      console.log('Array After', oldUrls)
    }

    axios.get('https://api.thedailyfunc.com/posts/image-delete/' + event.target.alt.match(/\/([^/]+)\/?$/)[1])
  }


  // When form is submitted then set the data and patch request to the DB.
  postDataHandler = () => {
    this.setState({loading: true})
    const data = {
      title: this.state.title,
      author: this.state.author,
      bodyText: this.state.bodyText,
      description: this.state.description,
      tags: this.state.tags.map((tag) => tag.trim()),
      category: this.state.category,
      postImages: this.state.postImages,
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
        url: '/posts/' + this.state._id,
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
          this.setState({loading: false})
        })
        .then(() =>  history.push('/all-posts'))
        .catch(err => {
          console.log("[POST - ERROR] - ", err)
        })
    } else { // Then this is a new post. 
        let keysToSend = ['title','author','tags', 'category', 'description', 'bodyText', 'isPublic', 'postImages']
        
        let dataObj = {}
        keysToSend.forEach((key) => {
          dataObj[key] = this.state[key]
        })

        console.log(dataObj)

        // The HTTP Request
        axios({
          method: 'post',
          url: 'https://api.thedailyfunc.com/posts',
          data: {...dataObj}, 
      
          headers: {
            'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'application/json'
          },
        })
          .then(res => {
            for (let key in data) {
              localStorage.removeItem(`${this.state.localStoragePrefix}${key}`)
              this.setState({loading: false})
            }
          })
          .then(() =>  history.push('/all-posts'))
      }
        
  }

  showPostForm = () => {
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
          selectedFiles={this.state.selectedFiles}
          postImages={this.state.postImages}
          togglePublic={this.togglePublic.bind(this)}
          updateStateHandler={this.updateStateHandler.bind(this)}
          fileUploadHandler={this.fileUploadHandler.bind(this)}
          fileChangedHandler={this.fileChangedHandler}
          postDataHandler={this.postDataHandler.bind(this)}
          deleteImageHandler={this.deleteImageHandler}
          loading={this.state.loading}
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
        {this.state.unsavedChanges && 
          <div className="alert">
            <span className="closebtn">!</span> 
              You have unsaved changes.
          </div>}
        {this.showPostForm()}
        {this.state.unsavedChanges && 
          <div className="alert">
            <span className="closebtn">!</span> 
              You have unsaved changes.
          </div>}
      </div>
    )
  }
}

export default EditPost