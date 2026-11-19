// codescape.js: shows every project with a  play  link, and runs it in the player

const codeGrid = document.getElementById("code-grid");
const player = document.getElementById("player");
const playerFrame = document.getElementById("player-frame");
let lastCard = null;

function openPlayer(project) {
  lastCard = document.activeElement;
  document.getElementById("player-title").textContent = project.title;
  document.getElementById("player-open").href = project.play;
  playerFrame.src = project.play;
  player.classList.add("open");
  document.body.classList.add("no-scroll");
  document.getElementById("player-close").focus();
}

function closePlayer() {
  player.classList.remove("open");
  document.body.classList.remove("no-scroll");
  playerFrame.src = "about:blank"; // stops the project running in the background
  if (lastCard) lastCard.focus();
}

document.getElementById("player-close").addEventListener("click", closePlayer);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && player.classList.contains("open")) closePlayer();
});

projects
  .filter((project) => project.play)
  .forEach((project) => {
    const card = makeCard(project, openPlayer);
    card.classList.add("code-card");

    const text = document.createElement("p");
    text.textContent = project.text;
    const tryIt = document.createElement("span");
    tryIt.className = "btn";
    tryIt.textContent = "Try it";
    card.querySelector(".card-body").append(text, tryIt);

    codeGrid.appendChild(card);
  });
