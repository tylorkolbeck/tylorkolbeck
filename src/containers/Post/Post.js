import React, { Component } from 'react'
// import { Link, NavLink } from 'react-router-dom'
import './Post.css'
import { deletePostHandler } from './deletePost'

class post extends Component {
  state = {
    isDeleted: false
  }

  setDeletedStateHandler() {
    this.setState({isDeleted: true})
  }


  showDeleteButton() {
    let deleteButton = null
    let isAdmin = this.props.userId ? true : false
    if (isAdmin && this.props.adminMode) {
      deleteButton = <span id={this.props.id} onClick={() => deletePostHandler(this.props.id, this.props.userId, this.setDeletedStateHandler.bind(this))} className="post__delete_post_button">x</span>
    } 
    return deleteButton
  }

  tagLoop(arr) {
    const tagArray = []
    if (Array.isArray(arr) && arr.length > 0) {
      let arrayCounter = 0;
      
      arr.forEach((tag)=> {
        if (tag.length > 0) {
          tagArray.push(<div className='tag_block' key={tag + arrayCounter} onClick={this.props.tagFilter}>{tag}</div>)
        }
        arrayCounter++
      })
      return tagArray
    } 
    return null
  }

render () {
    const displayNoneStyle = this.state.isDeleted ? {display: 'none'} : null
    // const isPublic = (this.props.isPublic && this.props.adminMode) ? {background: 'rgb(192,216,144,.2)'} : {background: 'rgb(238,181,179,.2)'} ? {background: ''} : null
    
    const isPublic = () => {
      if (this.props.adminMode) {
        if (this.props.isPublic) {
          return {background: 'rgb(192,216,144,.2)'}
        }
        if (!this.props.isPublic) {
          return {background: 'rgb(238,181,179,.2)'}
        }
        else {
          return {background: 'none'}
        }
      }
    }

    return (
      <div style={{...isPublic(), ...displayNoneStyle}} className='posts__post_details_container'>
          <div className='Sync'>
          <div className='sync__date__desktop Courier'>
              <p className='month'>{this.props.date[1]}</p>
              <p className='date'>{this.props.date[2]}</p>
              <p className='year'>{this.props.date[0]}</p>
          </div>
      
          <div className='sync__main__info'>
            <div style={{width:'100%'}}>
              <h1 style={{display: 'inline-block', marginRight: '50px'}} onClick={(event) => this.props.clicked(event)}>{this.props.title}</h1>
              <span style={{position: 'absolute', right: '16px'}}>{this.showDeleteButton()}</span>
            </div>
              
              <h3><span className='bold' style={{fontSize: '.9rem', paddingLeft: '16px'}}>Author: </span><span style={{fontSize: '.9rem'}}>{this.props.author} </span> <span className='sync__date__mobile'>{this.props.date[2] + this.props.date[1].toUpperCase() + this.props.date[0].toString().slice(-2)}</span></h3>
              <p style={{paddingLeft: '16px'}}>{this.props.description}</p>
              <div className='tags' style={{paddingLeft: '16px'}}><span>{this.tagLoop(this.props.tags)}</span></div>
          </div>
  
          </div>
      </div>
    )  
  
}
}

export default post