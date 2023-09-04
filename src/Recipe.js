import React, { useState, useEffect } from "react";

function Recipe(props) {
  const [recipe, setRecipe] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const newRecipeName = document.getElementById("recipeNameInput").value;
    const fetchData = async () => {
      await fetch(`http://localhost:3000/recipe/${props.recipe}`,{
        method: 'PATCH',
        body: JSON.stringify({
          "name": `${newRecipeName}`
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
    }
    fetchData()
      .catch(console.error)
    setIsEditing(false);
    recipe.name=newRecipeName;
    props.onUpdate(newRecipeName);
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
    <div className="h-100 flex-column row">
      <h2>Recipe:</h2>
      {isEditing ? (
        <input id="recipeNameInput" type="text" className="form-control editable-title" defaultValue = {recipe.name}></input>
      ) : ( 
          recipe.id ? (
            <h3 className="title">{recipe.name}</h3>
          ) : ( null
        )
      )
      }

      {isEditing ? (
        <textarea className="form-control flex-grow-1"
        defaultValue={recipe.description}></textarea>
      ) : ( recipe.id ? (
              <div className="flex-grow-1">{recipe.description}</div>
              ) : (<div>Please select a recipe from the list.</div>
            )
      )}
      {isEditing ? (
        <div className="w-100">
          <button className="btn input-block-level form-control" onClick={handleSaveClick}>Save</button>
          <button className="btn input-block-level form-control" onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : ( recipe.id ? (
              <button className="btn input-block-level form-control" onClick={handleEditClick}>Edit</button>
              ) : (null
            )
      )}  
    </div>     
  );
}
export default Recipe;