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
  const recipeIds = Object.keys(recipes);
  const result = [];
  while (result.length < count && recipeIds.length > 0) {
    const id = recipeIds.splice(Math.floor(Math.random() * recipeIds.length), 1)[0];
    result.push(recipes[id]);
  }
  return result;
}

function cookNextDish() {
  if (currentDishIndex >= currentShift.length) {
    endShift();
    return;
  }

  const dish = currentShift[currentDishIndex];
  isCooking = true;
  document.getElementById("cook-btn").disabled = false;
  document.getElementById("cook-btn").textContent = `Cook ${dish.name}`;
  document.getElementById("cook-progress").value = 0;
}

document.getElementById("cook-btn").addEventListener("click", () => {
  if (!isCooking) return;
  const dish = currentShift[currentDishIndex];
  let progress = document.getElementById("cook-progress");
  progress.value += 20;

  if (progress.value >= 100) {
    completeDish(dish);
  }
});

function completeDish(dish) {
  isCooking = false;
  cash += dish.cashReward;
  xp += dish.xpReward;
  shiftCash += dish.cashReward;
  shiftXP += dish.xpReward;

  if (dish.skills.knife) knifeSkill += 1;
  if (dish.skills.heat) heatSkill += 1;

  // Dish mastery
  if (!mastery[dish.id]) mastery[dish.id] = { timesCooked: 0, masteryStars: 0 };
  mastery[dish.id].timesCooked++;
  const cooked = mastery[dish.id].timesCooked;
  if (cooked >= 15) mastery[dish.id].masteryStars = 5;
  else if (cooked >= 10) mastery[dish.id].masteryStars = 4;
  else if (cooked >= 6) mastery[dish.id].masteryStars = 3;
  else if (cooked >= 3) mastery[dish.id].masteryStars = 2;
  else if (cooked >= 1) mastery[dish.id].masteryStars = 1;

  localStorage.setItem("dishMastery", JSON.stringify(mastery));
  updateUI();

  currentDishIndex++;
  cookNextDish();
}

function endShift() {
  alert(`Shift Complete!\n\nTotal Cash: $${shiftCash}\nTotal XP: ${shiftXP}\nDishes: ${currentShift.length}`);
  document.getElementById("cook-btn").disabled = true;
  document.getElementById("cook-btn").textContent = "Start Next Shift";
  document.getElementById("cook-btn").addEventListener("click", startShift, { once: true });
}

function updateUI() {
  document.getElementById("cash").textContent = `💵 $${cash}`;
  document.getElementById("xp").textContent = `⭐ XP: ${xp}`;
  document.getElementById("knife-skill").textContent = knifeSkill;
  document.getElementById("heat-skill").textContent = heatSkill;
}

// Initialize
loadRecipes();
startShift();
