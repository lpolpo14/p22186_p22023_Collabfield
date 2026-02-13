document.addEventListener("turbo:load", () => {
  const cards = document.querySelectorAll(".single-post-card");
  if (!cards.length) return;

  const mode = Math.floor(Math.random() * 2);
  const colorSet = randomColorSet();

  cards.forEach(card => {
    if (mode === 1) {
      card.classList.add("solid-color-mode");
      card.style.backgroundColor = randomColor(colorSet);
    } else {
      card.classList.add("border-color-mode");
      card.style.border = `5px solid ${randomColor(colorSet)}`;
    }
  });

  const feed = document.getElementById("feed");
  if (!feed) return;

  feed.addEventListener("mouseover", event => {
    const item = event.target.closest(".single-post-list");
    if (item) item.style.borderColor = randomColor(colorSet);
  });

  feed.addEventListener("mouseout", event => {
    const item = event.target.closest(".single-post-list");
    if (item) item.style.borderColor = "rgba(0,0,0,0.05)";
  });
});

function randomColorSet() {
  const sets = [
    ['#45CCFF', '#49E83E', '#FFD432', '#E84B30', '#B243FF'],
    ['#FF6138', '#FFFF9D', '#BEEB9F', '#79BD8F', '#79BD8F'],
    ['#FCFFF5', '#D1DBBD', '#91AA9D', '#3E606F', '#193441'],
    ['#004358', '#1F8A70', '#BEDB39', '#FFE11A', '#FD7400'],
    ['#105B63', '#FFFAD5', '#FFD34E', '#DB9E36', '#BD4932'],
    ['#04BFBF', '#CAFCD8', '#F7E967', '#A9CF54', '#588F27'],
    ['#405952', '#9C9B7A', '#FFD393', '#FF974F', '#F54F29']
  ];
  return sets[Math.floor(Math.random() * sets.length)];
}

function randomColor(set) {
  return set[Math.floor(Math.random() * set.length)];
}

