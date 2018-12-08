import React, { Component } from 'react'
import './NewPost.css'
import history from '../../history'
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'

class NewPost extends Component  {
  state = {
    submitted: false,
    
    title: localStorage.getItem('title') ? localStorage.getItem('title') : '',
    author: localStorage.getItem('author') ? localStorage.getItem('author') : '',
    bodyText: localStorage.getItem('bodyText') ? localStorage.getItem('bodyText') : '',
    description: localStorage.getItem('description') ? localStorage.getItem('description') : '',
    tags: localStorage.getItem('tags') ? localStorage.getItem('tags') : '',
    category: localStorage.getItem('category') ? localStorage.getItem('category') : '',
    postImages: [],
    isPublic: false
  }

  updateStateHandler(event) {
    let fieldName = event.target.name
    let fieldValue = event.target.value
    this.setState({[fieldName]: fieldValue})
    localStorage.setItem(fieldName, fieldValue)
  }

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
      isPublic: this.state.isPublic
    }

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
        const fieldNames = ['title', 'author', 'bodyText', 'description', 'tags', 'category']

        this.setState({submitted: true}) 
        fieldNames.forEach((name) => {
          localStorage.removeItem(name)
        })
       
      })
      .then(() =>  history.push('/all-posts'))
      .catch(err => {
        console.log("[POST - ERROR] - ", err)
      })
  }
  
  render () {
    let showNewPostForm = null
    if (this.props.userId) {
      showNewPostForm = 
      <div className='NewPost'>
        <div className="newpost_form_container">
        
          <label style={{marginTop: '30px'}}>Title</label>
          <input type='text' name="title" value={this.state.title} onChange={event => this.updateStateHandler(event)} />
        
          <label style={{marginTop: '30px'}}>Author</label>
          <input type='text' name='author' value={this.state.author} onChange={event => this.updateStateHandler(event)} />
      
          <label>Tags</label>
          <input type='text' name="tags" value={this.state.tags} onChange={event => this.updateStateHandler(event)} />
        
          <label>Category</label>
          <input type='text' name="category" value={this.state.category} onChange={event => this.updateStateHandler(event)} />
        

          <label>Description</label>
          <textarea name="description" value={this.state.description} onChange={event => this.updateStateHandler(event)} />

          <label>Body</label>
          <textarea style={{height: '800px'}} name="bodyText" value={this.state.bodyText} onChange={event => this.updateStateHandler(event)}></textarea>

          <div className="newpost__live_preview_container">

              {ReactHtmlParser(this.state.bodyText)}
         
          </div>

          
          <label>Images</label>
          <input type="file" readOnly/> 
          <input type="file" readOnly/> 
          <input type="file" readOnly/> 
      
      <div>
        Is Public?
        <label className="newpost__ispublic_container">
            <input type="checkbox" onChange={(event) => this.setState({isPublic: event.target.checked})}></input>
            <span className="newpost__ispublic_checkmark"></span>
          </label>
      </div>
         

          <button onClick={this.postDataHandler}>Add Post</button> 
        </div>
        
    </div>
    
    } else {
      showNewPostForm = <div>You do not have permission to create a new post.  Please login.</div>
    }

    return (
      <div>
        {showNewPostForm}
       
      </div>
     
    )
  }
}

export default NewPost