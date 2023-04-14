import './form.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getAllRecipes, createRecipe, getAllDiets, clearDetail } from '../../redux/actions';

//validar los inputs del formulario
const validate = (input, recipes) => {
  let errors = {};

  //validacion de name
  if (!input.name.trim()) {errors.name = 'Add a name';};
  if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)) {errors.name = 'Name can only contain letters'};
  if(recipes.includes(input.name.trim())) {errors.name = 'This recipe already exists'};

  //validacion image url
  if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(input.image)) {errors.image = 'The URL is not valid'}
  
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

  const [error, setError] = useState({firstTry: true})

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllDiets());
    return () => {      //le paso un return cuando se desmonta
      dispatch(clearDetail())
    }
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

    if(!error.firstTry){
      setError(validate({
        ...input,
        [e.target.name]: e.target.value,
      },recipesCheck));
    }
  };

  const handleSelect = (e) => {
    const selectedDiet = e.target.value;

    //Si la dieta ya esta seleccionada, no se agrega de nuevo
    if(!input.diets.includes(selectedDiet)) {
      setInput({
        ...input,
        diets: [...input.diets, selectedDiet]
      })

    if(!error.firstTry){
       setError(validate({
        ...input,
        diets: [...input.diets, selectedDiet]
        },recipesCheck));
      }
    }
  };

  const handleDelete = (diet) => {
    setInput({
      ...input,
      diets: input.diets.filter(d => d !== diet)
    })

    if(!error.firstTry){
      setError(validate({
        ...input,
        diets: input.diets.filter(d => d !== diet)
      },recipesCheck));
    }
  };

  const handleCheckErrors = (e)  => {
    e.preventDefault();
    setError(validate({
        ...input,
        [e.target.name]: e.target.value,
        diets: [...input.diets, e.target.value]
    },recipesCheck))
    handleSubmit(e)
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.name && input.summary && input.healthScore > 0 && input.instructions.length >= 1 && input.diets.length >= 1){
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
    error.firstTry = false
    history.push('/home')
    } 
    if(error.firstTry){
      alert('please complete the options')
    }
  };
  
  return (
    <div className='container-form'>
      <h1 className='tittle-form'>Create your Recipe!!</h1>
      <form className='form' onSubmit={e => handleSubmit(e)}>
        <div className='form-inputs'>
          <label className='form-name__label'>Name: </label>
          <input type='text'
                 value={input.name}
                 name='name'
                 autoComplete='off'
                 placeholder='Name'
                 onChange={handleChange}
                 className='form-input'/>
              {
                      error.name && (
                          <p className='form-p'>{error.name}</p>
                      )
                  }
        </div>

        <div className='form-inputs'>
          <label className='form-image__label'>Image: </label>
          <input type='text'
                 value={input.image}
                 name='image'
                 autoComplete='off'
                 placeholder='Image URL'
                 onChange={handleChange}
                 className='form-input'/>
              {
                      error.image && (
                          <p className='form-p'>{error.image}</p>
                      )
                  }
        </div>

        <div className='form-inputs'>
          <label className='form-summary__label'>Summary: </label>
          <textarea value={input.summary}
                    name='summary'
                    autoComplete='off'
                    placeholder='Summary...'
                    onChange={handleChange}
                    className='form-textarea'/>
              {
                      error.summary && (
                          <p className='form-p'>{error.summary}</p>
                      )
                  }
        </div>

        <div className='form-inputs'>
          <label className='form-healthScore__label'>healthScore: </label>
          <input type='range'
                 name='healthScore'
                 min='0'
                 max='100'
                 value={input.healthScore}
                 onChange={handleChange}
                 className='form-input_range'/>
          <p>{input.healthScore}</p>
              {
                      error.healthScore && (
                          <p className='form-p'>{error.healthScore}</p>
                      )
                  }
        </div>

        <div className='form-inputs'>
          <label className='form-instructions__label'>instructions: </label>
          <textarea value={input.instructions}
                    name='instructions'
                    autoComplete='off'
                    placeholder='instructions...'
                    onChange={handleChange}
                    className='form-textarea'/>
              {
                      error.instructions && (
                          <p className='form-p'>{error.instructions}</p>
                      )
                  }
        </div>

        <div className='form-inputs'>
          <label className='form-diets__label'>Diets: </label>
          <select name='diets' onChange={handleSelect}>
            <option hidden value='default'>Diets</option>
            {diets.map(d => (
                <option key={d.id}value={d.name}>{d.name}</option>
                ))}
          </select>
          {
                      error.diets && (
                          <p className='form-p'>{error.diets}</p>
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

        {/* <div className='form-submit'>
          <button className='btn' type='submit'>Create</button>
        </div> */}
        <div>
                    {error.name || 
                    error.image || 
                    error.summary || 
                    error.diets || 
                    error.healthScore ||
                    error.instructions ?
                    <button className='btn' disabled>Create</button>
                    :<button className='btn' onClick={e => handleCheckErrors(e)}>Create</button>}
                    </div>
      </form>
      <NavLink to='/home'><button className='btn' >back</button></NavLink>
    </div>
  )
};


export default Form;