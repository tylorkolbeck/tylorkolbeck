import React, { Component } from 'react'

class NewPost extends Component  {
  state ={
    title: '',
    date: '',
    body: '',
    author: '',
    description: ''
  }

  postDataHandler = () => {
    console.log(this.state)
  }
  
  render () {
    return (
      <div className='NewPost'>
        <h1>Add a Sync</h1>
        

        {/* TITLE INPUT */}
        <label>Title</label>
        <input type='text' value={this.state.title} onChange={event => this.setState({title: event.target.value})} />

        {/* DATE INPUT */}
        <label>Date</label>
        <input type='text' value={this.state.date} onChange={event => this.setState({date: event.target.value})} />

        {/* AUTHOR INPUT */}
        <label>Author</label>
        <input type='text' value={this.state.author} onChange={event => this.setState({author: event.target.value})} />

        <br></br>
        {/* DESCRIPTION INPUT */}
        <label>Description</label><br></br>
        <textarea style={{width: '100%', height: '50px'}} value={this.state.description} onChange={event => this.setState({description: event.target.value})}> </textarea>

        <br></br>
        {/* BODY INPUT */}
        <label>Body</label><br></br>
        <textarea style={{height: '300px', width: '100%'}}value={this.state.body} onChange={event => this.setState({body: event.target.value})}></textarea>
      
      <button onClick={this.postDataHandler}>Add Sync</button>
      </div>
      
    )
  }
}

export default NewPost