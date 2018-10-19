import React from 'react'
import './Sync.css'


const sync = props => {

  let testTags = [' Python ', 'Javscript ', 'React ' ]
  const tagLoop = () => {
    return testTags.join(' | ')
  }
  
  return (

    <div className='Sync'>
      <div className='sync__date__desktop Courier'>
        <p className='month'>JAN</p>
        <p className='date'>18</p>
        <p className='year'>1990</p>
      </div>

      <div className='sync__main__info'>
        <h1>Sync Title</h1>
        <h3>Sync Author</h3>
        <p>Sync Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
        <p className='tags'>Tags:<span style={{fontWeight: 400}}>{tagLoop()}</span></p>
      </div>

    </div>
  )
}

export default sync