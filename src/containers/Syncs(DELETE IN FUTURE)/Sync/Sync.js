import React from 'react'
import './Sync.css'



const sync = props => {

  const tagLoop = (arr) => {
    if (Array.isArray(arr)) {
      return arr.join(' | ')
    } else {
      return arr
    }
  }
  
  return (

    <div className='Sync' onClick={props.clicked}>
      <div className='sync__date__desktop Courier'>
        <p className='month'>JAN</p>
        <p className='date'>18</p>
        <p className='year'>1990</p>
      </div>

      <div className='sync__main__info'>
        {/* The link to navigate to the post FullPage */}

        {/* <h1><Link to={'/sync/' + props.id}>{props.title}</Link></h1> */}
        

        <h1>{props.title}</h1>
        <h3><span className='bold'>By: </span>{props.author}<span className='sync__date__mobile'> - {props.date}</span></h3>
        <p><span className='tab'> </span>{props.description}</p>
        <p className='tags'>Tags: <span style={{fontWeight: 400, fontSize: '1rem', fontStyle: 'italic'}}>{tagLoop(props.tags)}</span></p>
      </div>

    </div>
  )
}

export default sync