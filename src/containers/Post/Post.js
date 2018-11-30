import React from 'react'
// import { Link, NavLink } from 'react-router-dom'
import './Post.css'


const post = props => {
  const tagLoop = (arr) => {
    const tagArray = []
    if (Array.isArray(arr)) {
      arr.forEach((tag)=> {
        // tagArray.push(<Link to={filterRoute} key={tag}><div className='tag_block' key={tag} onClick={props.tagFilter}>{tag}</div></Link>)
        tagArray.push(<div className='tag_block' key={tag} onClick={props.tagFilter}>{tag}</div>)
      })
    } else {
      return arr
    }
    return tagArray
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
            <h1 onClick={props.clicked}>{props.title}</h1>
            <h3><span className='bold' style={{fontSize: '.9rem'}}>Author: </span><span style={{fontSize: '.9rem'}}>{props.author} </span> <span className='sync__date__mobile'>{props.date[2] + props.date[1].toUpperCase() + props.date[0].toString().slice(-2)}</span></h3>
            <p><span className='tab'> </span>{props.description}</p>
            <div className='tags'><span>{tagLoop(props.tags)}</span></div>
        </div>

        </div>
    </div>
  )
}

export default post