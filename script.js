let recipes = {};
let mastery = JSON.parse(localStorage.getItem("dishMastery") || "{}");

let progress = 0;
let cash = 0;
let xp = 0;
let knifeSkill = 1;
let heatSkill = 1;

let currentShift = [];
let currentDishIndex = 0;
let isCooking = false;
let shiftXP = 0;
let shiftCash = 0;

function loadRecipes() {
  fetch("data/recipes.json")
    .then(res => res.json())
    .then(data => {
      recipes = data.reduce((acc, r) => ({ ...acc, [r.id]: r }), {});
      populateRecipeBook(data);
    });
}

function populateRecipeBook(data) {
  const nav = document.getElementById("quick-nav");
  const recipeBtn = document.createElement("button");
  recipeBtn.textContent = "📖 Recipe Book";
  recipeBtn.onclick = () => showRecipeBook(data);
  nav.prepend(recipeBtn);
}

function showRecipeBook(data) {
  let list = "Available Recipes:\n\n";
  data.forEach(r => {
    const cooked = mastery[r.id]?.timesCooked || 0;
    const stars = "★".repeat(mastery[r.id]?.masteryStars || 0);
    list += `${r.name} ${stars}\nIngredients: ${r.ingredients.join(", ")}\n\n`;
  });
  alert(list); // Replace with styled UI later
}

function startShift() {
  currentShift = getRandomRecipes(3, 5);
  currentDishIndex = 0;
  shiftXP = 0;
  shiftCash = 0;
  cookNextDish();
}

function getRandomRecipes(min, max) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
