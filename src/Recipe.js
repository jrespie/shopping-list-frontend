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
    fetch(`http://localhost:3000/recipe/${props.recipe}`, {
      method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
      setRecipe(data);
    })
      .catch((error) => console.log(error));
  }, [props.recipe]);
  console.log("Recipe" + JSON.stringify(recipe));
  return (
    <div>
      <h2>Recipe:</h2>
      {isEditing ? (
        <textarea 
        defaultValue={recipe.description}></textarea>
      ) : (
        <div>{recipe.description}</div>
      )}
      {isEditing ? (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}  
    </div>     
  );
}
export default Recipe;