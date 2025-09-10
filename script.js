const storyEl = document.getElementById("story");
const hero = document.getElementById("hero");
const bg = document.getElementById("background");
const charactersContainer = document.getElementById("characters-container");
const itemsContainer = document.getElementById("items-container");

// Sounds
const bgMusic = document.getElementById("bgMusic");
const itemSound = document.getElementById("itemSound");
const talkSound = document.getElementById("talkSound");

// Hero position
let heroX = 360;
let heroY = 300;
const heroSpeed = 20;

// Inventory
let inventory = [];

// Scenes
const scenes = {
  village_garden: {
    background: "images/village_garden.jpg",
    characters: [
      { name: "Villager Anna", src: "characters/villager.png", x: 500, y: 350, dialogue: "Hello! Welcome to the village!" }
    ],
    items: [
      { name: "Magic Key", src: "items/magickey.png", x: 200, y: 400 }
    ],
    exits: [
      { x: 700, y: 300, width: 50, height: 200, nextScene: "forest" }
    ]
  },
  forest: {
    background: "images/forest_of_magic_dark_road.jpg",
    characters: [
      { name: "Forest Creature", src: "characters/forest_creature.png", x: 400, y: 300, dialogue: "Grrr! Beware adventurer!" }
    ],
    items: [
      { name: "Crystal", src: "items/crystal.png", x: 600, y: 350 }
    ],
    exits: [
      { x: 50, y: 300, width: 50, height: 200, nextScene: "village_garden" }
    ]
  }
};

// Current scene
let currentScene = "village_garden";

// Load scene
function loadScene(sceneKey) {
  const scene = scenes[sceneKey];
  currentScene = sceneKey;

  // Background
  bg.style.backgroundImage = `url(${scene.background})`;

  // Clear previous characters/items
  charactersContainer.innerHTML = "";
  itemsContainer.innerHTML = "";

  // Add characters
  scene.characters.forEach(c => {
    const el = document.createElement("img");
    el.src = c.src;
    el.className = "character";
    el.style.left = c.x + "px";
    el.style.top = c.y + "px";
    charactersContainer.appendChild(el);
    c.el = el; // store reference for collision
  });

  // Add items
  scene.items.forEach(i => {
    const el = document.createElement("img");
    el.src = i.src;
    el.className = "item";
    el.style.left = i.x + "px";
    el.style.top = i.y + "px";
    itemsContainer.appendChild(el);
    i.el = el; // store reference
  });

  storyEl.textContent = "Move with arrow keys. Collect items and explore!";
}

// Collision detection
function isColliding(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

// Inventory update
function updateInventory() {
  console.log("Inventory:", inventory.map(i => i.name));
}

// Movement controls
document.addEventListener("keydown", e => {
  switch(e.key) {
    case "ArrowUp": heroY -= heroSpeed; break;
    case "ArrowDown": heroY += heroSpeed; break;
    case "ArrowLeft": heroX -= heroSpeed; break;
    case "ArrowRight": heroX += heroSpeed; break;
  }
  hero.style.left = heroX + "px";
  hero.style.top = heroY + "px";

  checkItemCollision();
  checkCharacterInteraction();
  checkExits();
});

// Check item collision
function checkItemCollision() {
  const scene = scenes[currentScene];
  for (let i = scene.items.length - 1; i >= 0; i--) {
    const item = scene.items[i];
    if (isColliding(hero, item.el)) {
      inventory.push(item);
      item.el.remove();
      scene.items.splice(i,1);
      updateInventory();
      storyEl.textContent = `You picked up: ${item.name}!`;
      itemSound.play();
    }
  }
}

// Check character interaction
function checkCharacterInteraction() {
  const scene = scenes[currentScene];
  scene.characters.forEach(c => {
    if (isColliding(hero, c.el)) {
      storyEl.textContent = c.dialogue;
      talkSound.play();
    }
  });
}

// Check scene exits
function checkExits() {
  const scene = scenes[currentScene];
  scene.exits.forEach(exit => {
    if (
      heroX + hero.offsetWidth > exit.x &&
      heroX < exit.x + exit.width &&
      heroY + hero.offsetHeight > exit.y &&
      heroY < exit.y + exit.height
    ) {
      // Move hero to start of new scene
      heroX = 50; heroY = 300;
      loadScene(exit.nextScene);
    }
  });
}

// Start music after first click
document.addEventListener("click", () => {
  if(bgMusic.paused) bgMusic.play();
}, { once: true });

// Start game
loadScene(currentScene);


