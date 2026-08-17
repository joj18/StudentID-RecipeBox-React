import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import RecipeCard from "./RecipeCard";
import AddEditRecipeForm from "./AddEditRecipeForm";
import Layout from "./Layout";
import NotFound from "./NotFound";
import { Recipe } from "./utils/Recipe";
import {
  searchRecipes,
  filterByCategory,
  filterByDifficulty,
} from "./utils/helpers";
import "./App.css";

const initialRecipes = [
  new Recipe(
    1,
    "Pancakes",
    ["Flour", "Milk", "Eggs", "Sugar", "Butter"],
    "Mix the ingredients and cook on a hot pan.",
    "15 min",
    "Breakfast",
    "Easy"
  ),
  new Recipe(
    2,
    "Koshari",
    [
      "Rice",
      "Lentils",
      "Macaroni",
      "Chickpeas",
      "Tomato Sauce",
      "Onion",
      "Garlic",
      "Vinegar",
      "Spices",
    ],
    "Cook the ingredients separately and combine them with the sauces.",
    "45 min",
    "Main",
    "Medium"
  ),
  new Recipe(
    3,
    "Beef Wellington",
    [
      "Beef",
      "Puff Pastry",
      "Mushrooms",
      "Egg",
      "Butter",
      "Garlic",
      "Thyme",
      "Salt",
      "Pepper",
      "Mustard",
      "Flour",
      "Olive Oil",
    ],
    "Prepare the beef and mushroom filling, wrap in pastry, and bake.",
    "120 min",
    "Main",
    "Hard"
  ),
];

function RecipeList({
  recipes,
  onEdit,
  onDelete,
  onStartTimer,
  timerRecipeId,
  timeLeft,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  let displayedRecipes = searchRecipes(recipes, searchTerm);

  displayedRecipes = filterByCategory(
    displayedRecipes,
    categoryFilter
  );

  displayedRecipes = filterByDifficulty(
    displayedRecipes,
    difficultyFilter
  );

  return (
    <>
      <header className="app-header">
        <h1>Recipe Box</h1>
        <p>Your collection of favorite recipes</p>
      </header>

      <section className="filters">
        <input
          type="text"
          placeholder="🔎 Search recipes..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Main">Main</option>
        </select>

        <select
          value={difficultyFilter}
          onChange={(event) => setDifficultyFilter(event.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </section>

      <section className="recipe-list">
        {displayedRecipes.length === 0 ? (
          <p className="empty-state">No recipes found. Try changing your search or filters.</p>
        ) : (
          displayedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={onEdit}
              onDelete={onDelete}
              onStartTimer={onStartTimer}
              timerRecipeId={timerRecipeId}
              timeLeft={timeLeft}
            />
          ))
        )}
      </section>
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");

    if (savedRecipes) {
      const parsedRecipes = JSON.parse(savedRecipes);

      return parsedRecipes.map(
        (recipe) =>
          new Recipe(
            recipe.id,
            recipe.title,
            recipe.ingredients,
            recipe.instructions,
            recipe.cookTime,
            recipe.category,
            recipe.difficulty || "Easy"
          )
      );
    }

    return initialRecipes;
  });

  const [recipeToEdit, setRecipeToEdit] = useState(null);

  const [timerRecipeId, setTimerRecipeId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleSaveRecipe = (recipeData) => {
    if (recipeToEdit) {
      recipeToEdit.title = recipeData.title;
      recipeToEdit.ingredients = recipeData.ingredients;
      recipeToEdit.instructions = recipeData.instructions;
      recipeToEdit.cookTime = recipeData.cookTime;
      recipeToEdit.category = recipeData.category;

      setRecipes([...recipes]);
      setRecipeToEdit(null);
    } else {
      const newRecipe = new Recipe(
        Date.now(),
        recipeData.title,
        recipeData.ingredients,
        recipeData.instructions,
        recipeData.cookTime,
        recipeData.category,
        "Easy"
      );

      setRecipes([...recipes, newRecipe]);
    }

    navigate("/");
  };

  const handleEdit = (recipe) => {
    setRecipeToEdit(recipe);
    navigate(`/recipe/edit/${recipe.id}`);
  };

  const handleDelete = (recipe) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.title}"?`
    );

    if (confirmed) {
      setRecipes((currentRecipes) =>
        currentRecipes.filter((item) => item.id !== recipe.id)
      );
    }
  };

  const handleStartTimer = (recipe) => {
    const minutes = parseInt(recipe.cookTime, 10);

    if (isNaN(minutes) || minutes <= 0) {
      alert("This recipe does not have a valid cooking time.");
      return;
    }

    setTimerRecipeId(recipe.id);
    setTimeLeft(minutes * 60);
  };

  useEffect(() => {
    if (timerRecipeId === null) return;

    const timer = setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          clearInterval(timer);
          alert("Cooking timer finished!");
          setTimerRecipeId(null);
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerRecipeId]);

  const formRecipe =
    recipeToEdit ||
    (location.pathname.startsWith("/recipe/edit/")
      ? recipes.find(
        (recipe) =>
          recipe.id === Number(location.pathname.split("/").pop())
      )
      : null);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <RecipeList
                recipes={recipes}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStartTimer={handleStartTimer}
                timerRecipeId={timerRecipeId}
                timeLeft={timeLeft}
              />
            </main>
          }
        />

        <Route
          path="/recipe/new"
          element={
            <main>
              <AddEditRecipeForm
                recipeToEdit={null}
                onSave={handleSaveRecipe}
                onCancel={() => navigate("/")}
              />
            </main>
          }
        />

        <Route
          path="/recipe/edit/:id"
          element={
            <main>
              {formRecipe ? (
                <AddEditRecipeForm
                  recipeToEdit={formRecipe}
                  onSave={handleSaveRecipe}
                  onCancel={() => navigate("/")}
                />
              ) : (
                <NotFound />
              )}
            </main>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;