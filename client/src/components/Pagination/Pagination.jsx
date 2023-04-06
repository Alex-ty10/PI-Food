import React from "react";


const Pagination  = ({ recipesPerPage, recipes, pagination}) => {
  const pageNumbers = []

  for (let i = 0; i < Math.ceil(recipes/recipesPerPage); i++) {
    pageNumbers.push(i + 1)
  }

  return(
    <nav className="container">
      <ul className='container-pagination'>
        {pageNumbers && pageNumbers.map(number => {
          return (
            <li className='number' key={number}>
            <a onClick={() => pagination(number)}>{number}</a>
          </li>
          )
        })}
      </ul>
    </nav>
  )

}

export default Pagination;