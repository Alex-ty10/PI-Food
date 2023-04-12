import './searchBar.css'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRecipeName } from '../../redux/actions';
import lupa from '../../assets/lupasearch.png'

const SearchBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleOnChange = (e) => {
    e.preventDefault();
    setName(e.target.value)
  }

    const handleOnClick = (e) => {
      e.preventDefault();
      if(name){
        dispatch(getRecipeName(name))
        setName('')
    }
  }

  return (
    <div className='searchbar-container'>
      <form className='searchbar'>
        
          <input className='searchbar-input'
                 type='text'
                 onChange={handleOnChange}
                 placeholder='  Search a recipe'/>

          <NavLink to={`/home?name=${name}`}>
          <button className='searchbar-btn' onClick={e => handleOnClick(e)}><img src={lupa}alt="no image"></img></button>
        </NavLink>
      </form>
    </div>
  )
}

export default SearchBar;