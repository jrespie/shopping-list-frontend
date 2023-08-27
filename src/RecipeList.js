import React, { useState, useEffect } from "react";
import Recipe from './Recipe';

function RecipeList() {
  const [recipeList, setRecipeList] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/recipe`);
    const data = await response.json();
    setRecipeList(data.recipes);
  }

    fetchData()
    .catch(console.error);
  },[]);
  console.log(recipeList)
  

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };
  
  return (
    <div>
      <div className="RecipeList" class="container">
        <div class="row">
          <div class="col-sm-6">
            <h2>Recipe List:</h2>
            <ul class="list-group">
              {recipeList.map(recipe => (
                <li class="list-group-item" 
                  onClick={() => handleItemClick(recipe.id)}
                  style={{
                    backgroundColor: selectedItem === recipe.id ? 'yellow' : 'white',
                    cursor: 'pointer',
                  }}
                  key={recipe.id}>
                    {recipe.name}
                  </li>
                ))}
            </ul>
            {console.log("selected Item: "+ selectedItem)}
          </div>
          <div class="col-sm-6">
            <Recipe recipe={selectedItem} key={selectedItem}></Recipe>
          </div>
        </div>
      </div>
    </div>
  );
  
}
export default RecipeList;