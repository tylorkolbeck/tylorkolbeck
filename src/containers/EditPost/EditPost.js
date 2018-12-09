import React, { Component } from 'react'
import './EditPost.css'
import history from '../../history'
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'
import btns from '../../MyModules/PostFormatter/postFormatter'

class EditPost extends Component  {
  state = {
    submitted: false,
    userId: this.props.location.state ? this.props.location.state.userId : 'dasf234234',
    loadedPost: false,
    title: '',
    author: '',
    tags: [],
    category: '',
    description: '',
    bodyText: '',
    postImages: [],
    isPublic: false,
    cursorLocation: 0
  }
  
  componentDidMount() {
    if (this.props.match.params.postId) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.postId))
      axios.get('/posts/' + this.props.match.params.postId) 
        .then(res => {
          let newData = {
            ...res.data.doc
          }
          this.setState({...newData, loadedPost: true})
        })
        .catch(err => {
          console.log(err)
        })
      }
  }

  tagMaker(tags) {
    if (Array.isArray.tags) {
      let tagString = tags.toString()
      this.setState({tags: tagString})
      return tagString.split(',')
      
    } 
  }

  // tagsFormatter(tags) {
    
  //   tagsArray.push(tags.toLowerCase(tags.split(',')))
  //   this.setState({tags: tagsArray})    
  // }

  updateStateHandler(event) {

    btns.getCursorLocation(event)

    if (event.target.name === 'bodyText') {
      this.setState({cursorLocation: event.target.selectionEnd})
    }

    if (event.target.name === 'tags') {
      let tagsArray = []
      if (Array.isArray(event.target.value )) {
        tagsArray.push(event.target.value)
        this.setState({tags: this.state.tags.push(event.target.value)})
        return console.log(this.state)
      } else if (typeof event.target.value === 'string') {
        tagsArray = event.target.value.split(',')
         this.setState({tags: [...tagsArray]})
         return console.log(this.state)
      }
      return
    }



    let fieldName = event.target.name
    let fieldValue = event.target.value
    this.setState({[fieldName]: fieldValue})
    // localStorage.setItem(fieldName, fieldValue)
  }

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      author: this.state.author,
      bodyText: this.state.bodyText,
      description: this.state.description,
      tags: this.state.tags,
      category: this.state.category,
      postImages: [],
      isPublic: this.state.isPublic
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
      })
      .then(() =>  history.push('/all-posts'))
      .catch(err => {
        console.log("[POST - ERROR] - ", err)
      })
  }
  
  render () {
    let showNewPostForm = null

    if (this.props.location.state.userId) {
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

          {/* <label>Body</label>
          <textarea style={{height: '800px'}} name="bodyText" value={this.state.bodyText} onChange={event => this.updateStateHandler(event)}></textarea> */}


          {/* {##############################} */}

          <div className="NewPost__textArea_formatter">
            <div className="NewPost__textarea_buttons">
              <span onClick={(e)=> btns.insertTag(e, this._txtArea)}><b className="bold">Bold </b></span>
              <span onClick={(e)=> btns.insertTag(e, this._txtArea)}><i className="italic">italic</i></span>
              <span className="unl" onClick={(e)=> btns.insertTag(e, this._txtArea)}>Underline</span>

              <span onClick={(e)=> btns.insertTag(e, this._txtArea)} className="p">p</span>
              <span onClick={(e)=> btns.insertTag(e, this._txtArea)} className="tab">tab</span>

              <span onClick={(e)=> btns.insertTag(e, this._txtArea)} className="h1">h1</span>
              <span onClick={(e)=> btns.insertTag(e, this._txtArea)} className="h2">h2</span>
              <span onClick={(e)=> btns.insertTag(e, this._txtArea)} className="h3">h3</span>
              <span onClick={(e)=> btns.insertTag(e, this._txtArea)} className="h4">h4</span>
              <span onClick={(e)=> btns.insertTag(e, this._txtArea)} className="pre">&lt; &gt;</span>

              <span>{this.state.cursorLocation}</span>

            </div>
            
            <textarea 
              style={{height: '800px'}} 
              name="bodyText" 
              value={this.state.bodyText} 
              onKeyDown={(e) => btns.tabHandler(e)}
              onChange={(e) => this.updateStateHandler(e)}
              onFocus={(e) => this.updateStateHandler(e)}
              ref={(txtArea) => {this._txtArea = txtArea }}
              >
            </textarea>

          </div>

          {/* {##############################} */}




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
              <input type="checkbox" name="isPublic" checked={this.state.isPublic} onChange={(event) => this.setState({isPublic: !this.state.isPublic})}></input>
              <span className="newpost__ispublic_checkmark"></span>
            </label>
        </div>
         
          <button onClick={this.postDataHandler}>Update Post</button> 
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

export default EditPost