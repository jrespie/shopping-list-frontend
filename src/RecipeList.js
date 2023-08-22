import React, { useState, useEffect } from "react";

function RecipeList() {
  const [recipeList, setRecipeList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/recipe", {
      method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
      setRecipeList(data.recipes);
      console.log(data);
    })
      .catch((error) => console.log(error));
  }, []);
  console.log(recipeList)
  return (
    <div className="RecipeList" class="container">
        <div class="row">
            <div class="col-sm-4">
                <h2>Recipe List:</h2>
                <ul class="list-group">
                    {recipeList.map(recipe => <li class="list-group-item" key={recipe.id}>{recipe.name}</li>)}
                </ul>
            </div>
        </div>
    </div>
  );
}
export default RecipeList;