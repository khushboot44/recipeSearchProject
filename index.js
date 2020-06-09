import React, { useEffect,useState } from 'react';
import { render } from 'react-dom';
import Recipe from './Recipe';



const App = () => {

  const App_ID = 'c6f2ddb6';
  const App_Key = 'd4b0c90f1c6777474de58cedb296d3db'

const [recipes, setRecipes] = useState([]);
 const [search,setSearch] = useState('');
 const [query,setQuery] = useState('Chicken')

  useEffect(()=>{
      getRecipes();
  },[query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_Key}`);
  const data = await response.json();
  console.log(data.hits);

  setRecipes(data.hits)
}

const updateSearch = e =>
{
  setSearch(e.target.value);
  console.log(search);
}

 const getSearch = e => {
   e.preventDefault();
   setQuery(search);
   setSearch('');
 }

  return(
    <div className='App'> 
    <form className='search-form' onSubmit={getSearch}>
    <input type='text' className='search-bar' value={search} onChange={updateSearch}/>
    <button type='submit' className="searchButton">Search</button>
    </form>
    <div className="recipes">
     {
       recipes.map((res) => {
          return (
            <Recipe 
            key={res.recipe.label}
            title={res.recipe.label} 
            calories={res.recipe.calories} 
            image={res.recipe.image}
            ingredients={res.recipe.ingredients}/>
          )
     })
     }
     </div>
     

     
      
      
    
    </div>
  )
}

render(<App />, document.getElementById('root'));
