import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRecipeName } from '../../redux/actions';

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
    <div className='searchbar-conatiner'>
      <form className='searchbar'>
        
          <input className='searchbar-input'
                 type='text'
                 onChange={handleOnChange}
                 placeholder='Search a recipe'/>

          <NavLink to={`/home?name=${name}`}>
          <button className='searchbar-btn' onClick={e => handleOnClick(e)}>search</button>
        </NavLink>
      </form>
    </div>
  )
}

export default SearchBar;