export class Recipe {
  constructor(
    id,
    title,
    ingredients,
    instructions,
    cookTime,
    category,
    difficulty
  ) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.cookTime = cookTime;
    this.category = category;
    this.difficulty = difficulty;
  }

  get difficulty() {
    return this._difficulty;
  }

  set difficulty(value) {
    if (!["Easy", "Medium", "Hard"].includes(value)) {
      throw new Error("Difficulty must be Easy, Medium, or Hard.");
    }

    this._difficulty = value;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      ingredients: this.ingredients,
      instructions: this.instructions,
      cookTime: this.cookTime,
      category: this.category,
      difficulty: this.difficulty,
    };
  }
}