import './orderingfilters.css'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets, filterByDiets, filterBySource, orderByName, orderByHealthScore } from '../../redux/actions';
import { useHistory } from 'react-router-dom';


const OrderingFilters = () => {

  const histoty = useHistory();
  const dispatch =  useDispatch();
  const diets = useSelector(state => state.diets);

  useEffect(() => {
    dispatch(getAllDiets())
  },[dispatch])

  const handleOrderingByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    /* ordering(1,`Ordering ${e.target.value}`) */
  }
  
  const handleOrderingByHealthScore = (e) => {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
    /* ordering(1, `Ordering ${e.target.value}`) */
  }

  const handleFilterByDiets = (e) => {
    e.preventDefault();
    dispatch(filterByDiets(e.target.value));
  }

  const handleFilterBySource = (e) => {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));
  }

  const handleClearFilter = () => {
    histoty.go(0);
  }

  return (
    <div className='container-filters'>
      <select defaultValue='default' className='container-select' onChange={handleOrderingByName}>
        <option className='container-select__option' hidden value='default'>Order By Name</option>
        <option className='container-select__option' value='A - Z'>A - Z</option>
        <option className='container-select__option' value='Z - A'>Z - A</option>
      </select>

      <select defaultValue='default' className='container-select' onChange={handleOrderingByHealthScore}>
        <option hidden value='default'>Order By HealthScore</option>
        <option value='More'>Most to least HealthScore</option>
        <option value='Less'>Least to most HealthScore</option>
      </select>

      <select defaultValue='default' className='container-select' onChange={handleFilterByDiets}>
        <option className='container-select__option' hidden value='default'>Filter By Diets</option>
        <option className='container-select__option' value='All'>All diets</option>
        {diets.map(d => (
          <option className='container-select__option' key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>

      <select defaultValue='default' className='container-select' onChange={handleFilterBySource}>
        <option className='container-select__option' hidden value='default'>Order By Source</option>
        <option className='container-select__option' value='DB'>DB</option>
        <option className='container-select__option' value='API'>API</option>
      </select>

      <button className='container-btn' onClick={handleClearFilter}>Clear Filters</button>

    </div>
  )

}
export default OrderingFilters;