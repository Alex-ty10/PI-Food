import './card.css'
import React from 'react';
import { NavLink } from 'react-router-dom'

const Card = ({id, name, image, diets}) => {
  return (
    
    <div className='container-card'>
      <div className='container-image'>
        <img className='container-image__img' src={image} alt='busca una imagen'/>
      </div>
      <div className='container-info'>
        <p className='container-info__title' key={id}>{name}</p>
      </div>
      <div className='diets-div'>
          <p>Diets: </p>
          {diets && diets.length > 0 && (
            <ul className='list'>
              {diets?.map(d => {
                return(
                  <li key={d.name ? d.name : d}>{d.name ? d.name : d}</li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    
  )
};

export default Card;