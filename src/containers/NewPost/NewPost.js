import React, { Component } from 'react'
import './NewPost.css'


import { Redirect } from 'react-router-dom'
import axios from 'axios';

class NewPost extends Component  {
  state = {
    submitted: false,
    
    title: '',
    author: '',
    bodyText: '',
    description: '',
    tags: [],
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

          <div className="newpost_form_container">
          
            <label style={{marginTop: '30px'}}>Title</label>
            <input type='text' onChange={event => this.setState({title: event.target.value})} />
          
            <label style={{marginTop: '30px'}}>Author</label>
            <input type='text' onChange={event => this.setState({author: event.target.value})} />
        
            <label>Tags</label>
            <input type='text' onChange={event => this.tagsFormatter(event.target.value)} />
          
            <label>Category</label>
            <input type='text' onChange={event => this.setState({category: event.target.value})} />
          

            <label>Description</label>
            <textarea onChange={event => this.setState({description: event.target.value})} />

            <label>Body</label>
            <textarea style={{height: '800px'}} onChange={event => this.setState({bodyText: event.target.value})}></textarea>

            <label>Images</label>
            <input type="file" readOnly/> 
            <input type="file" readOnly/> 
            <input type="file" readOnly/> 
        

            <button onClick={this.postDataHandler}>Add Post</button>

            <button onClick={this.postDataHandler}>Save For Later</button> 
          </div>
      </div>
      
    )
  }
}

export default NewPost