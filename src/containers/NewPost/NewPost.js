import React, { Component } from 'react'
import './NewPost.css'


import { Redirect } from 'react-router-dom'

class NewPost extends Component  {
  state ={
    id: 0,
    title: 'TITLE 1',
    date: '',
    body: 'BODY 1',
    author: 'Tylor Kolbeck',
    description: 'DESCRIPTION 1',
    tags: 'Comma Seperated Tags',
    visible: false
  }

  componentDidMount() {
    this.randomIdGenerator()
    this.getNewDate()
  }

  postDataHandler = () => {
    // let postRef = firebase.database().ref('posts')
    const data ={
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      description: this.state.description,
      date: this.state.date,
      tags: this.state.tags,
      id: this.state.id,
      visible: true,
      submitted: false,
    }
    console.log(data)
    // The HTTP Request
    // postRef.child(data.id).set(data)
      .then(res => {
        
        // this.props.history.replace('/syncs') // This will prevent going back to the new post page again

        // Redirect to the syncs page after submitting
        this.setState({submitted: true}) // This will prevent going back to the new post page again
      })
      .catch(err => {
        console.log("[POST - ERROR] - ", err)
      })
  }

  randomIdGenerator = () => {
    let newId = Math.random().toString(36).substr(2, 9)
    this.setState({id: newId}) 
  }

  getNewDate = () => {
    let month, day, year, dateObj, newDate;
    dateObj = new Date()
    month = dateObj.getUTCMonth() + 1
    day = dateObj.getUTCDate()
    year = dateObj.getUTCFullYear()
    newDate = day + " " + month + " " + year
    // console.log(newDate)
    this.setState({date: newDate})
  }
  
  render () {
    let redirect = null
    if (this.state.submitted) {
      redirect = <Redirect to="/syncs" />
    }

    return (
      <div className='NewPost'>

        {/*  IF PAGE IS SUBMITTED THEN REDIRECT TO SYNCS */}
        {redirect}
        {/* <button onClick={this.postDataHandler}>Add Post</button> */}
          <h1>New Post - ID: {this.state.id}</h1>
          
          <div>
            {/* AUTHOR INPUT */}
            <label>Author</label>
            <input type='text' value={this.state.author} onChange={event => this.setState({author: event.target.value})} />
          </div>

          <div>
            {/* TAGS INPUT */}
            <label>Tags</label>
            <input type='text' style={{width: '100%'}} value={this.state.tags} onChange={event => this.setState({tags: event.target.value})} />
          </div>

          <div>
            {/* TITLE INPUT */}
            <label>Title</label>
            <input type='text' style={{width: '100%'}} value={this.state.title} onChange={event => this.setState({title: event.target.value})} />
          </div>
          
          {/* <div> */}
          {/* DATE INPUT */}
          {/* <label>Date</label> 
          <input type='text'  value={this.state.date} onChange={event => this.setState({date: event.target.value})} />
          </div> */}

          <div>
            {/* DESCRIPTION INPUT */}
            <label>Description</label>
            <textarea value={this.state.description}  style={{width: '100%', height: '100px'}} onChange={event => this.setState({description: event.target.value})}> </textarea>

          </div>
          
          <div className='new__post__textarea-body'>
            {/* BODY INPUT */}
            <label>Body</label>
            <textarea value={this.state.body} style={{width: '100%', height: '1000px'}} onChange={event => this.setState({body: event.target.value})}></textarea>
          </div>
        
        <button onClick={this.postDataHandler}>Add Post</button>
        <button onClick={this.postDataHandler}>Save For Later</button>
      </div>
      
    )
  }
}

export default NewPost