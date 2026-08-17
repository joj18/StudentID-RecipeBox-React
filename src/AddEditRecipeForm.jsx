import { useState } from "react";
import { validateTitle, validateCookTime } from "./utils/validators";
import "./AddEditRecipeForm.css";

function AddEditRecipeForm({ recipeToEdit, onSave, onCancel }) {
  const [title, setTitle] = useState(recipeToEdit?.title || "");

  const [ingredients, setIngredients] = useState(
    recipeToEdit?.ingredients.join(", ") || ""
  );

  const [instructions, setInstructions] = useState(
    recipeToEdit?.instructions || ""
  );

  const [cookTime, setCookTime] = useState(
    recipeToEdit?.cookTime || ""
  );

  const [category, setCategory] = useState(
    recipeToEdit?.category || ""
  );

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!validateTitle(title)) {
      newErrors.title = "Please enter a valid recipe title.";
    }

    if (!validateCookTime(cookTime)) {
      newErrors.cookTime = "Use a format such as 15 min.";
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    }

    if (!instructions.trim()) {
      newErrors.instructions = "Instructions are required.";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSave({
      title: title.trim(),
      ingredients: ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
      cookTime: cookTime.trim(),
      category: category.trim(),
    });
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>{recipeToEdit ? "Edit Recipe" : "Add New Recipe"}</h2>
          <p>
            {recipeToEdit
              ? "Update your recipe details."
              : "Add a delicious recipe to your collection."}
          </p>
        </div>

        <label>
          Recipe Title
          <input
            type="text"
            value={title}
            onChange={(event) => {
              const value = event.target.value;
              setTitle(value);

              if (value && !validateTitle(value)) {
                setErrors((current) => ({
                  ...current,
                  title: "Please enter a valid recipe title.",
                }));
              } else {
                setErrors((current) => ({
                  ...current,
                  title: "",
                }));
              }
            }}
            placeholder="e.g. Chocolate Cake"
          />
          {errors.title && <small>{errors.title}</small>}
        </label>

        <label>
          Ingredients
          <input
            type="text"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            placeholder="Flour, Eggs, Milk, Sugar"
          />
          {errors.ingredients && <small>{errors.ingredients}</small>}
        </label>

        <label>
          Instructions
          <textarea
            value={instructions}
            onChange={(event) =>
              setInstructions(event.target.value)
            }
            placeholder="Describe how to prepare the recipe..."
          />
          {errors.instructions && (
            <small>{errors.instructions}</small>
          )}
        </label>

        <label>
          Cook Time
          <input
            type="text"
            value={cookTime}
            onChange={(event) => {
              const value = event.target.value;
              setCookTime(value);

              if (value && !validateCookTime(value)) {
                setErrors((current) => ({
                  ...current,
                  cookTime: "Use a format such as 15 min.",
                }));
              } else {
                setErrors((current) => ({
                  ...current,
                  cookTime: "",
                }));
              }
            }}
            placeholder="e.g. 30 min"
          />
          {errors.cookTime && <small>{errors.cookTime}</small>}
        </label>

        <label>
          Category
          <input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="e.g. Breakfast"
          />
          {errors.category && <small>{errors.category}</small>}
        </label>

        <div className="form-buttons">
          <button className="save-button" type="submit">
            {recipeToEdit ? "Save Changes" : "Add Recipe"}
          </button>

          <button
            className="cancel-button"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddEditRecipeForm;