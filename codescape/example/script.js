let clicks = 0;
document.getElementById("egg").addEventListener("click", () => {
  clicks++;
  document.getElementById("count").textContent = clicks;
  if (clicks === 10) document.getElementById("egg").textContent = "🐣";
});
