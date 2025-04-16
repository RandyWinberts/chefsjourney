let progress = 0;
let interval;
let cash = 0;
let xp = 0;

function startGame() {
  document.getElementById('title-screen').classList.add('hidden');
  document.getElementById('game-ui').classList.remove('hidden');
  setGregLine("Right then. Try not to set anything on fire.");
  animateGreg(0); // idle
}

function cookRecipe() {
  progress = 0;
  document.getElementById('progress-bar').value = 0;
  setGregLine("Cooking... let’s see if you learned anything.");
  animateGreg(1); // cooking

  clearInterval(interval);
  interval = setInterval(() => {
    progress += 5;
    document.getElementById('progress-bar').value = progress;

    if (progress >= 100) {
      clearInterval(interval);
      completeRecipe();
    }
  }, 300);
}

function completeRecipe() {
  let cashEarned = 5;
  let xpEarned = 10;
  cash += cashEarned;
  xp += xpEarned;

  document.getElementById('cash').textContent = `$${cash}`;
  document.getElementById('xp').textContent = `${xp}`;

  setGregLine("Not the worst thing I’ve seen today. Probably edible.");
  animateGreg(2); // nod or react
}

function setGregLine(text) {
  document.getElementById('greg-line').textContent = `"${text}"`;
}

function animateGreg(frame) {
  const sprite = document.getElementById('greg-sprite');
  const offsetX = frame * 128;
  sprite.style.backgroundPosition = `-${offsetX}px 0`;
}
