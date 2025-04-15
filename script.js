let progress = 0;
let cash = 0;
let xp = 0;
let knifeSkill = 1;
let heatSkill = 1;

document.getElementById("cook-btn").addEventListener("click", () => {
  progress += 10;
  document.getElementById("cook-progress").value = progress;

  if (progress >= 100) {
    progress = 0;
    cash += 5;
    xp += 10;
    document.getElementById("cash").textContent = `💵 $${cash}`;
    document.getElementById("xp").textContent = `⭐ XP: ${xp}`;
    // Simulate skill XP gain
    if (Math.random() < 0.5) knifeSkill++;
    else heatSkill++;

    document.getElementById("knife-skill").textContent = knifeSkill;
    document.getElementById("heat-skill").textContent = heatSkill;
  }
});
