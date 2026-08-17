export class RecipeError extends Error {
  constructor(message) {
    super(message);
    this.name = "RecipeError";
  }
}

// Uses filter()
export function searchRecipes(recipes, searchTerm) {
  try {
    if (!Array.isArray(recipes)) {
      throw new RecipeError("Recipes must be an array.");
    }

    if (typeof searchTerm !== "string") {
      throw new RecipeError("Search term must be a string.");
    }

    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    console.log("Search completed.");
  }
}

// Uses filter()
export function filterByCategory(recipes, category) {
  try {
    if (!Array.isArray(recipes)) {
      throw new RecipeError("Recipes must be an array.");
    }

    if (!category || category === "All") {
      return recipes;
    }

    return recipes.filter(
      (recipe) =>
        recipe.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    console.log("Category filter completed.");
  }
}

// Uses filter()
export function filterByDifficulty(recipes, difficulty) {
  try {
    if (!Array.isArray(recipes)) {
      throw new RecipeError("Recipes must be an array.");
    }

    if (!difficulty || difficulty === "All") {
      return recipes;
    }

    return recipes.filter(
      (recipe) =>
        recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    console.log("Difficulty filter completed.");
  }
}

// Uses map() and reduce()
export function getRecipeStatistics(recipes) {
  try {
    if (!Array.isArray(recipes)) {
      throw new RecipeError("Recipes must be an array.");
    }

    const recipeTitles = recipes.map((recipe) => recipe.title);

    const totalIngredients = recipes.reduce(
      (total, recipe) => total + recipe.ingredients.length,
      0
    );

    return {
      recipeTitles,
      totalIngredients,
    };
  } catch (error) {
    console.error(error);
    return {
      recipeTitles: [],
      totalIngredients: 0,
    };
  } finally {
    console.log("Recipe statistics completed.");
  }
}