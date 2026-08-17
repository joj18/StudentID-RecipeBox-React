import "./RecipeCard.css";

function RecipeCard({
  recipe,
  onEdit,
  onDelete,
  onStartTimer,
  timerRecipeId,
  timeLeft,
}) {
  const isRunning = timerRecipeId === recipe.id;

  return (
    <article className={`recipe-card ${recipe.difficulty.toLowerCase()}`}>
      <div className="recipe-info">
        <h2>{recipe.title}</h2>

        <p>🥕 {recipe.ingredients.length} ingredients</p>
        <p>⏱️ {recipe.cookTime}</p>
        <p>🍽️ {recipe.category}</p>

        <span className="difficulty">{recipe.difficulty}</span>

        {isRunning && (
          <div className="timer">
            ⏳ {timeLeft} seconds remaining
          </div>
        )}
      </div>

      <div className="card-buttons">
        <button
          className="edit-button"
          type="button"
          onClick={() => onEdit(recipe)}
        >
          Edit
        </button>

        <button
          className="cook-button"
          type="button"
          onClick={() => onStartTimer(recipe)}
          disabled={isRunning}
        >
          {isRunning ? "Cooking..." : "Start Cooking"}
        </button>

        <button
          className="delete-button"
          type="button"
          onClick={() => onDelete(recipe)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;