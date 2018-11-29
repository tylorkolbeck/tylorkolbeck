import React from 'react'
import brainLogo from '../../assets/images/brain_logo.svg'
import './Logo.css'

const logo = (props) => (
  <div className="logo__image">
    <img src={brainLogo} alt='Brain Logo'/>
  </div>
)

export default logo