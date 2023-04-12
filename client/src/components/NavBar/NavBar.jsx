import './navBar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import LogoOl from '../LogoOl/LogoOI';
import OrderingFilters from '../Ordering&Filters/Ordering&Filters';


const NavBar = () => {
  return (
    <div className='nav-container'>
      <div className='nav-logo'>
        <NavLink to='/home' className='nav-logo'>
          <button ><LogoOl/></button>
        </NavLink>
      </div>
      
      <div className='nav-searchbar'>
        <SearchBar/>
      </div>

      <div className='nav-create'>
        <NavLink to='/create' >
          <button className='nav-create__btn'>New recipe</button>
        </NavLink>
      </div>

      <div className='nav-filters'>
        <h2>Filters:</h2>
        <OrderingFilters/>
      </div>
    </div>
  )
};


export default NavBar;