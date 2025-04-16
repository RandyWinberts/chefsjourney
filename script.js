let progress = 0;
let interval;
let cash = 0;
let xp = 0;

function startGame() {
  document.getElementById('title-screen').classList.add('hidden');
  document.getElementById('game-ui').classList.remove('hidden');
  setGregLine("Right then. Try not to set anything on fire.");
  animateGreg(0);
}

function cookRecipe() {
  progress = 0;
  document.getElementById('progress-bar').value = 0;
  document.getElementById('progress-label').textContent = "Cooking... 0%";
  setGregLine("Cooking... let’s see if you learned anything.");

  clearInterval(interval);
  interval = setInterval(() => {
    progress += 5;
    document.getElementById('progress-bar').value = progress;
    document.getElementById('progress-label').textContent = `Cooking... ${progress}%`;

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
  document.getElementById('progress-label').textContent = "Completed!";

  setGregLine("Not the worst thing I’ve seen today. Probably edible.");
  document.getElementById('progress-bar').value = 0;
}

function setGregLine(text) {
  document.getElementById('greg-line').textContent = `"${text}"`;
}

function animateGreg(frame) {
  const offset = frame * 128;
  document.getElementById('greg-sprite').style.backgroundPosition = `-${offset}px 0`;
}
