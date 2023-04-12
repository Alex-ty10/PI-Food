import './landing.css'
import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='landingPage'>
      <h1 className='ladingPage-tittle'>WELCOME TO MY PROJECT!</h1>
      <NavLink to='/home'>
        <button className='ladingPage-link'>Let's get started</button>
      </NavLink>
    </div>
  )
};


export default Landing;