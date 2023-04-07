import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/actions';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import OrderingFilters from '../Ordering&Filters/Ordering&Filters'


const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  //const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;// 1 * 9 = 9
  const indexOfFirstRecipes = indexOfLastRecipe - recipesPerPage;// 9 - 9 = 0
  const currentRecipes = recipes.slice(indexOfFirstRecipes,indexOfLastRecipe)// desde el index 0 al 9 sin incluir el 9

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const ordering = (pageNumber, orderType) => {
    setCurrentPage(pageNumber)
    setOrder(orderType)
  }

  useEffect(() => {
    dispatch(getAllRecipes());
  },[dispatch])
  return (
    <div className='container'>
      <div>
        <OrderingFilters ordering={ordering}/>
      </div>
      <div>
      {currentRecipes?.map(r => {
        return(
          <Card id={r.id}
                name={r.name}
                image={r.image}
                diets={r.diets}
                key={r.id}
                />
        )
      })}
      </div>
      <div>
        <Pagination recipesPerPage={recipesPerPage}
                    recipes={recipes.length}
                    pagination={pagination}
                    />
      </div>
      
    </div>
  )
};


export default Home;