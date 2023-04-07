import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,useParams } from 'react-router-dom';
import { getRecipeID } from '../../redux/actions';


const DetailCard = () => {

  const dispatch =  useDispatch();
  const recipe = useSelector(state => state.recipe);
  
  const { name, image, summary, healthScore, instrutions, diets } = recipe;
  let { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeID(id))
  },[dispatch, id]);

  return (
    <div>
      DetailCard
    </div>
  )
};


export default DetailCard;