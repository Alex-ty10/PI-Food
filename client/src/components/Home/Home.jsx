import './home.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/actions';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';


const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  const currentPage = useSelector(state => state.page);
  const order = useSelector(state => state.order);
  const [isLoading, setIsLoading] = useState(true);
  //const [order, setOrder] = useState('');
  //const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;// 1 * 9 = 9
  const indexOfFirstRecipes = indexOfLastRecipe - recipesPerPage;// 9 - 9 = 0
  const currentRecipes = recipes.slice(indexOfFirstRecipes,indexOfLastRecipe)// desde el index 0 al 9 sin incluir el 9

/*   const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  } */

  /* const ordering = (pageNumber, orderType) => {
    setCurrentPage(pageNumber)
    setOrder(orderType)
  } */
  
   useEffect(() => {
    dispatch(getAllRecipes());
    setIsLoading(false);
  },[dispatch]) 

  return (
    <div>
      {isLoading ? <Loading/> 
      : <div className='container'>
      <div className='container-cards'>
      {currentRecipes?.map(r => {
        return(
          <Link to={`/recipes/${r.id}`}>
            <button>
              <Card id={r.id}
                  name={r.name}
                  image={r.image}
                  diets={r.diets}
                  key={r.id}
                  />
            </button>
          </Link>
        )
      })}
      </div>
      <div className='home-pagination'>
        <Pagination recipesPerPage={recipesPerPage}
                    recipes={recipes.length}
                    />
      </div>
    
    </div>}
    </div>
  )
};


export default Home;