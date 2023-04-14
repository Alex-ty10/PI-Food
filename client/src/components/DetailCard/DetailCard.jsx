import './detailCard.css'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getRecipeID, clearDetail, deleteRecipe } from '../../redux/actions';
import health from '../../assets/health.png'


const DetailCard = () => {

  const dispatch =  useDispatch();
  const history = useHistory();
  const recipe = useSelector(state => state.recipe);
  
  const { name, image, summary, healthScore, instructions, diets, createdInDb } = recipe;
  let { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeID(id))
    return () => {      //le paso un return cuando se desmonta
      dispatch(clearDetail())
    }
  },[dispatch, id]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(`Are you sure to delete the ${name} recipe`)
    if(confirmed){
      dispatch(deleteRecipe(id))
      alert(`The ${name} recipe has been removed`)
      history.push('/home')
    }
  }


  return (
    <div className='container-detail'>
      <div className='datail-image'>
        <img src={image} alt='no image'></img>
      </div>
      <div className='name-health'>
        <div className='name'><h2>{name} || ID: {id}</h2></div>
        <div className='health'>
          <img src={health}/>
          <p>Health Score: {healthScore}</p>
        </div>
        
      </div>
      
      <div className='info-detail'>
        <div className='info-summary'>
          <h2>summary:</h2>
          <p>{summary}</p>
        </div>
        <div className='info-instructions'>
          <h2>Instructions:</h2>
        {instructions?.length > 1 &&
          !id.includes('-') ? (
            instructions?.map((step, number) => {
              return (
                <div>
                  <p
                    key={number.number}
                  >
                    {" "}
                    Step {number + 1}:
                  </p>
                  <p>{step.step}</p>
                </div>
              );
            })
          ) : id.includes('-') ? (
            <h4> {instructions}</h4>
          ) : (
            <h4> This recipe doesn't instructions </h4>
          )}
        </div>
        
      </div>
      <div className='diets-detail'>
          <p>Diets: </p>
          {diets && diets.length > 0 && (
            <ul className='lista'>
              {diets?.map(d => {
                return(
                  <li key={d.name ? d.name : d}>{d.name ? d.name : d}</li>
                )
              })}
            </ul>
          )}
        </div>
        {createdInDb && <button className='btn-delete' onClick={() => handleDelete(id)}>Delete recipe</button>
        }
        
        <NavLink to='/home'><button className='btn' >back</button></NavLink>
    </div>
  )
};


export default DetailCard;