import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getAllRecipes, createRecipe, getAllDiets } from '../../redux/actions';

//validar los inputs del formulario
const validate = (input, recipes) => {
  let errors = {};

  //validacion de name
  if (!input.name.trim()) {errors.name = 'Add a name';};
  if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)) {errors.name = 'Name can only contain letters'};
  if(recipes.includes(input.name.trim())) {errors.name = 'This recipe already exists'};
  
  //validacion summary
  if(!input.summary) {errors.summary = 'Add a summary'};

  //validacion healthScore
  if(!input.healthScore) {errors.healthScore = 'Add a healthScore'};
  if(input.healthScore > 100 || input.healthScore < 1) {errors.healthScore = 'Add valid healthScore'};

  //validacion instructions
  if(!input.instructions.length) {errors.instructions = 'Add the instructions'};

   //validacion de diets
   if(!input.diets.length) {errors.diets = 'Select a diet'};

  return errors
}

const Form = () => {

  const dispatch =  useDispatch();
  const history = useHistory();
  const recipes = useSelector(state => state.recipes);
  const diets = useSelector(state => state.diets);

  const [error, setError] = useState({})

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
  },[dispatch])

  const [input, setInput] = useState({
    name: '',
    image: '',
    summary: '',
    healthScore: 0,
    instructions: [],
    diets: []
  })

  const recipesCheck = recipes.map(r => r.name)

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(validate({
      ...input,
      [e.target.name]: e.target.value,
    },recipesCheck));
  };

  const handleSelect = (e) => {
    const selectedDiet = e.target.value;

    //Si la dieta ya esta seleccionada, no se agrega de nuevo
    if(!input.diets.includes(selectedDiet)) {
      setInput({
        ...input,
        diets: [...input.diets, selectedDiet]
      })

      setError(validate({
        ...input,
        diets: [...input.diets, selectedDiet]
      },recipesCheck));
    }
  };

  const handleDelete = (diet) => {
    setInput({
      ...input,
      diets: input.diets.filter(d => d !== diet)
    })

    setError(validate({
      ...input,
      diets: input.diets.filter(d => d !== diet)
    },recipesCheck));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(error).length === 0){
      dispatch(createRecipe(input));
      alert('Your recipe has been created successfully!!')
      setInput({
        name: '',
        image: '',
        summary: '',
        healthScore: 0,
        instructions: [],
        diets: []
    });
    history.push('/home')
    } else{
      alert('please complete the options')
    }
  };

  return (
    <div className='container-form'>
      <h1 className='tittle-form'>Create your Recipe!!</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-name'>
          <label className='form-name__label'>Name: </label>
          <input type='text'
                 value={input.name}
                 name='name'
                 autoComplete='off'
                 placeholder='Name'
                 onChange={handleChange}/>
              {
                      error.name && (
                          <p>{error.name}</p>
                      )
                  }
        </div>

        <div className='form-image'>
          <label className='form-image__label'>Image: </label>
        </div>

        <div className='form-summary'>
          <label className='form-summary__label'>Summary: </label>
          <textarea value={input.summary}
                    rows='5' 
                    cols='50'
                    name='summary'
                    autoComplete='off'
                    placeholder='Summary...'
                    onChange={handleChange}/>
              {
                      error.summary && (
                          <p>{error.summary}</p>
                      )
                  }
        </div>

        <div className='form-healthScore'>
          <label className='form-healthScore__label'>healthScore: </label>
          <input type='range'
                 name='healthScore'
                 min='0'
                 max='100'
                 value={input.healthScore}
                 onChange={handleChange}/>
          <p>{input.healthScore}</p>
              {
                      error.healthScore && (
                          <p>{error.healthScore}</p>
                      )
                  }
        </div>

        <div className='form-instructions'>
          <label className='form-instructions__label'>instructions: </label>
          <input type='textarea'
                 value={input.instructions}
                 rows='5' 
                 cols='50'
                 name='instructions'
                 autoComplete='off'
                 placeholder='instructions...'
                 onChange={handleChange}/>
              {
                      error.instructions && (
                          <p>{error.instructions}</p>
                      )
                  }
        </div>

        <div className='form-diets'>
          <label className='form-diets__label'>Diets: </label>
          <select name='diets' onChange={handleSelect}>
            <option hidden value='default'>Diets</option>
            {diets.map(d => (
                <option key={d.id}value={d.name}>{d.name}</option>
                ))}
          </select>
          {
                      error.diets && (
                          <p>{error.diets}</p>
                      )
                  }
          
          <div className='form-deletes'>
            {input.diets.map((diet, index) => (
                <div className='form-deletes__div' key={index}>
                  {diet}
                  <button onClick={() => handleDelete(diet)}>x</button>
                </div>
              ))}
          </div>
        </div>

        <div className='form-submit'>
          <button className='form-submit__btn' type='submit'>Create</button>
        </div>
      </form>
      <NavLink to='/home'><button className="btn">back</button></NavLink>
    </div>
  )
};


export default Form;