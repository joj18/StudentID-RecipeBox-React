const titleRegex = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s'-]{2,49}$/;

const cookTimeRegex = /^\d+\s*(min|mins|minutes)$/i;

export function validateTitle(title) {
  return titleRegex.test(title.trim());
}

export function validateCookTime(cookTime) {
  return cookTimeRegex.test(cookTime.trim());
}