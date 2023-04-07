import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
  return (
    <div className='nav-conatainer'>
      <div className='nav-logo'>logo</div>
      <div className='nav-links'>
        <NavLink to='/home'>
          <div className='nav-links__div'>Home</div>
        </NavLink>
        <NavLink to='/create'>
          <div className='nav-links__div'>Create a activity</div>
        </NavLink>
      </div>
      <div>
      <SearchBar/>
      </div>
    </div>
  )
};


export default NavBar;