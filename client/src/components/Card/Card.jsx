import React from 'react';
import { NavLink } from 'react-router-dom'

const Card = ({id, name, image, diets}) => {
  return (
    <NavLink className='container' to={`/recipes/${id}`}>
      <div className='container-image'>
        <img className='container-image__img' src={image} alt='busca una imagen'/>
      </div>
      <div className='container-info'>
        <p className='container-info__title' key={id}>{name}</p>
        {diets && diets.length > 0 && (
          <ul>
            {diets?.map(d => {
              return(
                <li key={d.name ? d.name : d}>{d.name ? d.name : d}</li>
              )
            })}
          </ul>
        )}
      </div>
    </NavLink>
  )
};

export default Card;