import React from 'react'
// import { Link, NavLink } from 'react-router-dom'
import './Post.css'
import {deletePostHandler} from './deletePost'


const post = props => {
  const tagLoop = (arr) => {
    const tagArray = []
    if (Array.isArray(arr) && arr.length > 0) {
      let arrayCounter = 0;
      
      arr.forEach((tag)=> {
        if (tag.length > 0) {
          tagArray.push(<div className='tag_block' key={tag + arrayCounter} onClick={props.tagFilter}>{tag}</div>)
        }
        arrayCounter++
      })
      return tagArray
    } 
    return null
  }
  
  const showDeleteButton = () => {
    let deleteButton = null
    let isAdmin = props.userId ? true : false
    if (isAdmin) {
      deleteButton = <span id={props.id} onClick={() => deletePostHandler(props.id, props.userId)} className="post__delete_post_button">x</span>
    } 
    return deleteButton
  }
  
  return (
      
      <div>
        <div className='Sync'>
        <div className='sync__date__desktop Courier'>
            <p className='month'>{props.date[1]}</p>
            <p className='date'>{props.date[2]}</p>
            <p className='year'>{props.date[0]}</p>
        </div>
    
        <div className='sync__main__info'>
            <h1 style={{display: 'block', width: '100%'}}>{props.title}<span>{showDeleteButton()}</span></h1>
            <h3><span className='bold' style={{fontSize: '.9rem', paddingLeft: '16px'}}>Author: </span><span style={{fontSize: '.9rem'}}>{props.author} </span> <span className='sync__date__mobile'>{props.date[2] + props.date[1].toUpperCase() + props.date[0].toString().slice(-2)}</span></h3>
            <p style={{paddingLeft: '16px'}}>{props.description}</p>
            <div className='tags' style={{paddingLeft: '16px'}}><span>{tagLoop(props.tags)}</span></div>
        </div>

        </div>
    </div>
  )
}

export default post