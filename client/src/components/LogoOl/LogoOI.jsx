import './logoOl.css'
import React from 'react'
import logo from '../../assets/logo.png'

function LogoOl() {
  return (
    <div className='container-logo'>
      <div className='image-container'>
      <img className='image-logo' src={logo}></img>
      </div>
      
      <div className='tittle-container'>
        <h2 className='tittle-logo'>food</h2>
        <h4 className='sectittle-logo'>@Alex-ty10</h4>
      </div>
    </div>
  )
}

export default LogoOl