import React, { useState, useEffect } from "react";

function Recipe(props) {
  const [recipe, setRecipe] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/recipe/${props.recipe}`);
    const data = await response.json();
    setRecipe(data);
  }
  if(props.recipe){
    fetchData()
      .catch(console.error)
  }
  },[props.recipe]);

  return (
    <div>
      <h2>Recipe:</h2>
      {isEditing ? (
        <input defaultValue = {recipe.name}></input>
      ) : ( 
          recipe.id ? (
            <h3>{recipe.name}</h3>
          ) : ( null
        )
      )
      }

      {isEditing ? (
        <textarea 
        defaultValue={recipe.description}></textarea>
      ) : ( recipe.id ? (
              <div>{recipe.description}</div>
              ) : (<div>Please select a recipe from the list.</div>
            )
      )}
      {isEditing ? (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : ( recipe.id ? (
              <button onClick={handleEditClick}>Edit</button>
              ) : (null
            )
      )}  
    </div>     
  );
}
export default Recipe;