import './pagination.css'
import React from "react";
import { useDispatch } from 'react-redux';
import { currentPage } from '../../redux/actions';


const Pagination  = ({ recipesPerPage, recipes }) => {
  const pageNumbers = []
  const dispatch = useDispatch()

  for (let i = 0; i < Math.ceil(recipes/recipesPerPage); i++) {
    pageNumbers.push(i + 1)
  }


  return(
    <nav>
      <ul className='container-pagination'>
        {pageNumbers && pageNumbers.map(num => {
          return (
            <li className='number' key={num}>
            <a onClick={() => dispatch(currentPage(num))}>{num}</a>
          </li>
          )
        })}
      </ul>
    </nav>
  )
};

export default Pagination;


