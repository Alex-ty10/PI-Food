import React from 'react';
import notfound from '../../assets/notfound.jpg'
import './notfound.css';


const NotFound = () => {
    return(
        <div className='notfound'>
          <img src={notfound} alt='no image'/>
          <h2>Try clearing filters and go Home</h2>
        </div>
    )
};

export default NotFound;