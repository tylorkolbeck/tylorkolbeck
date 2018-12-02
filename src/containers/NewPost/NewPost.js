import React, { Component } from 'react'
import './NewPost.css'


import { Redirect } from 'react-router-dom'
import axios from 'axios';

class NewPost extends Component  {
  state = {
    submitted: false,
    
    title: 'TITLE 1',
    author: 'Tylor Kolbeck',
    bodyText: 'BODY 1',
    description: 'DESCRIPTION 1',
    tags: ['somthing'],
    category: '',
    postImages: [],
    isPublic: false
  }

  componentDidMount() {
    console.log('[COMPONENTDIDMOUNT]')

  }

  componentDidUpdate() {
    console.log('[COMPONENTDIDUPDATE')
    console.log(this.state)
  }

  tagsFormatter(tags) {
    let tagsArray = []
    tagsArray.push(tags.toLowerCase(tags.split(',')))
    this.setState({tags: tagsArray})    
  }

  // MAY NOT NEED THIS DATA OBJECT JUST SEND STATE TO SERVER
  postDataHandler = () => {
    const data ={
      submitted: false,

      title: this.state.title,
      author: this.state.author,
      bodyText: this.state.bodyText,
      description: this.state.description,
      tags: this.state.tags,
      category: this.state.category,
      postImages: [],
      isPublic: true
    }

    const formData = new FormData()
    for ( const key in this.state ) {
      formData.append(key, data[key])
    }
    formData.append('title', 'axios')
    formData.append('author', 'axios author')
    // The HTTP Request
    // postRef.child(data.id).set(data)
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
        console.log(res.err)
        
        // this.props.history.replace('/syncs') // This will prevent going back to the new post page again

        // Redirect to the syncs page after submitting
        this.setState({submitted: true}) // This will prevent going back to the new post page again
      })
      .catch(err => {
        console.log("[POST - ERROR] - ", err)
      })
  }
  
  render () {
    let redirect = null
    if (this.state.submitted) {
      redirect = <Redirect to="/all-posts" />
    }

    return (
      <div className='NewPost'>

        {/*  IF PAGE IS SUBMITTED THEN REDIRECT TO SYNCS */}
        {redirect}
        {/* <button onClick={this.postDataHandler}>Add Post</button> */}
      
          <div>
            {/* TITLE INPUT */}
            <label>Title</label>
            <input type='text' style={{width: '100%'}} value={this.state.title} onChange={event => this.setState({title: event.target.value})} />
          </div>

          <div>
            {/* AUTHOR INPUT */}
            <label>Author</label>
            <input type='text' value={this.state.author} onChange={event => this.setState({author: event.target.value})} />
          </div>

          <div>
            {/* TAGS INPUT */}
            <label>Tags</label>
            <input type='text' style={{width: '100%'}} value={this.state.tags} onChange={event => this.tagsFormatter(event.target.value)} />
          </div>

          <div>
            {/* CATEGORY INPUT MAY BE IMPLEMENTED IN THE FUTURE, MAKE A DROPDOWN? */}
            <label>Category</label>
            <input type='text' style={{width: '100%'}} value={this.state.category} onChange={event => this.setState({category: event.target.value})} />
          </div>


          <div>
            {/* DESCRIPTION INPUT */}
            <label>Description</label>
            <textarea value={this.state.description}  style={{width: '100%', height: '100px'}} onChange={event => this.setState({description: event.target.value})}> </textarea>
          </div>
          
          <div className='new__post__textarea-body'>
            {/* BODY INPUT */}
            <label>Body</label>
            <textarea value={this.state.bodyText} style={{width: '100%', height: '1000px'}} onChange={event => this.setState({bodyText: event.target.value})}></textarea>
          </div>

          <div>
            {/* IMAGES UPLOADING INPUT. FIGURE THIS OUT EVENTUALLY */}
            <label>Images</label>
            <input type='text' style={{width: '100%'}} value={"IMAGE UPLOADING FUTURE"} readOnly/>
          </div>
        
        <button onClick={this.postDataHandler}>Add Post</button>
        {/* SAVE FOR LATER SHOULD SET ISPUBLIC TO FALSE */}
        <button onClick={this.postDataHandler}>Save For Later</button> 
      </div>
      
    )
  }
}

export default NewPost