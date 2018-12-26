import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './Post.css'
import { deletePostHandler } from './deletePost'
import history from '../../history'



class post extends Component {
  state = {
    isDeleted: false
  }

  setDeletedStateHandler() {
    this.setState({isDeleted: true})
  }

  showAdminButtons() {
    let propsToPass = {
      userId: this.props.userId,
      postId: this.props.id
    }

    let adminButtons = null
    let isAdmin = this.props.userId ? true : false
    if (isAdmin && this.props.adminMode) {
      adminButtons = 
        <div>
          <span id={this.props.id} onClick={() => deletePostHandler(this.props.id, this.props.userId, this.setDeletedStateHandler.bind(this))} className="post__delete_post_button">x</span> 
          <span id={this.props.id} onClick={() => history.push({pathname: '../edit-post/' + this.props.id, state:{...propsToPass}})} className="post__edit_post_button">edit</span>
        </div>
    } 
    return adminButtons
  }

  tagLoop(arr) {
    let tagArray = []
    if (Array.isArray(arr) && arr.length > 0) {
      let arrayCounter = 0
      
      arr.forEach((tag)=> {
        if (tag.length > 0) {
          tagArray.push(<div className='tag_block' key={tag + arrayCounter} onClick={this.props.tagFilter}>{tag}</div>)
        }
        arrayCounter++
      })
      return tagArray
    } else if (typeof arr === 'string'){
      let arrayCounter = 0
      let newTagArr = arr.split(',')
      newTagArr.forEach(tag => {
        tagArray.push(<div className='tag_block' key={tag + arrayCounter} onClick={this.props.tagFilter}>{tag}</div>)
      })
      return tagArray
    }

  }

render () {
    const displayNoneStyle = this.state.isDeleted ? {display: 'none'} : null
    
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
            <span style={{position: 'absolute', right: '16px'}}>{this.showAdminButtons()}</span>
            <div style={{width:'100%'}}>
              <h1 style={{display: 'inline-block', paddingRight: '10px'}} onClick={(event) => this.props.clicked(event)}>{this.props.title}</h1><span style={{fontSize: '1.4rem', color: '#2EA399', fontFamily: '\'Montserrat\', sans-serif'}}>{this.props.author}</span>
            </div>
              
              <h3> <span className='sync__date__mobile'>{this.props.date[2] + this.props.date[1].toUpperCase() + this.props.date[0].toString().slice(-2)}</span></h3>
              <p style={{paddingLeft: '16px'}}>{this.props.description}</p>
              <div className='tags' style={{paddingLeft: '16px'}}><span>{this.tagLoop(this.props.tags)}</span></div>
          </div>
  
          </div>
      </div>
    )  
  
}
}

export default post