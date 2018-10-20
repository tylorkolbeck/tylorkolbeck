import React from 'react'
import './Sync.css'


const sync = props => {

  const tagLoop = () => {
    return props.tags.join(' / ')
  }
  
  return (

    <div className='Sync'>
      <div className='sync__date__desktop Courier'>
        <p className='month'>JAN</p>
        <p className='date'>18</p>
        <p className='year'>1990</p>
      </div>

      <div className='sync__main__info'>
        <h1><a href='/'>{props.title}</a></h1>
        <h3><span className='bold'>By:</span>{props.author}<span className='sync__date__mobile'> - {props.date}</span></h3>
        <p><span className='tab'> </span>{props.description}</p>
        <p className='tags'>Tags:<span style={{fontWeight: 400, fontSize: '1rem', fontStyle: 'italic'}}>{tagLoop()}</span></p>
      </div>

    </div>
  )
}

export default sync