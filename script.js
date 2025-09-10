const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");
const backgroundElement = document.getElementById("background");
const charactersContainer = document.getElementById("characters");
const itemsContainer = document.getElementById("items");

let inventory = [];

// Hero position
let hero = {
  left: 300,
  bottom: 100,
  element: null,
  speed: 10
};

// Keyboard controls
const keys = {};

// Listen to key press
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Update hero position
function moveHero() {
  if (!hero.element) return;
  if (keys['ArrowLeft']) hero.left -= hero.speed;
  if (keys['ArrowRight']) hero.left += hero.speed;
  if (keys['ArrowUp']) hero.bottom += hero.speed;
  if (keys['ArrowDown']) hero.bottom -= hero.speed;

  // Keep inside game
  hero.left = Math.max(0, Math.min(650, hero.left));
  hero.bottom = Math.max(0, Math.min(450, hero.bottom));

  hero.element.style.left = hero.left + "px";
  hero.element.style.bottom = hero.bottom + "px";

  checkItemCollision();
  requestAnimationFrame(moveHero);
}

// Check collision with items
function checkItemCollision() {
  const items = itemsContainer.querySelectorAll("img");
  items.forEach(item => {
    const rectHero = hero.element.getBoundingClientRect();
    const rectItem = item.getBoundingClientRect();
    if (!(rectHero.right < rectItem.left || 
          rectHero.left > rectItem.right || 
          rectHero.bottom > rectItem.bottom || 
          rectHero.top < rectItem.top)) {
      addItem({ name: item.alt });
      item.remove();
    }
  });
}

// Add item to inventory
function addItem(item) {
  if (!inventory.includes(item.name)) {
    inventory.push(item.name);
    alert("You collected: " + item.name);
  }
}

// Show characters
function showCharacters(chars) {
  charactersContainer.innerHTML = "";
  chars.forEach(c => {
    const img = document.createElement("img");
    img.src = c.file;
    img.alt = c.name;
    img.style.left = c.left + "px";
    img.style.bottom = c.bottom + "px";
    if(c.name === "Hero") hero.element = img;
    else img.classList.add("character-walk");
    charactersContainer.appendChild(img);
  });
  moveHero();
}

// Show items
function showItems(items) {
  itemsContainer.innerHTML = "";
  items.forEach(i => {
    const img = document.createElement("img");
    img.src = i.file;
    img.alt = i.name;
    img.style.left = i.offsetX + "px";
    img.style.bottom = i.offsetY + "px";
    itemsContainer.appendChild(img);
  });
}

// Show scene
function showScene(sceneKey) {
  const scene = story[sceneKey];
  storyElement.textContent = scene.text;
  backgroundElement.style.backgroundImage = `url(${scene.background})`;

  showCharacters(scene.characters || []);
  showItems(scene.items || []);

  choicesElement.innerHTML = "";
  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => showScene(choice.next);
    choicesElement.appendChild(button);
  });
}

// Scenes
const story = {
  start: {
    text: "You wake up in the village garden. The sun is shining. What will you do?",
    background: "images/village_garden.jpg",
    characters: [
      { file: "characters/hero.png", left: 300, bottom: 100, name: "Hero" }
    ],
    items: [],
    choices: [
      { text: "Go to the forest", next: "forest" },
      { text: "Go to the river", next: "river" }
    ]
  },
  forest: {
    text: "The forest is dark and mysterious. A path splits ahead.",
    background: "images/forest.jpg",
    characters: [
      { file: "characters/hero.png", left: 100, bottom: 100, name: "Hero" },
      { file: "characters/forest_creature.png", left: 500, bottom: 100, name: "Forest Creature" }
    ],
    items: [
      { file: "items/crystal.png", name: "Crystal", offsetX: 350, offsetY: 100 }
    ],
    choices: [
      { text: "Take the bright path → Forest of Magic", next: "forest_of_magic" },
      { text: "Take the dark road", next: "forest_dark_road" }
    ]
  },
  river: {
    text: "At the river, you find a strange map floating in the water.",
    background: "images/river.jpg",
    characters: [
      { file: "characters/hero.png", left: 300, bottom: 100, name: "Hero" },
      { file: "characters/villager.png", left: 500, bottom: 100, name: "Villager" }
    ],
    items: [
      { file: "items/map.png", name: "Map", offsetX: 400, offsetY: 120 }
    ],
    choices: [
      { text: "Pick up the map", next: "outside_house" },
      { text: "Ignore it and go back", next: "start" }
    ]
  },
  forest_of_magic: {
    text: "Glowing crystals light up the forest. You feel magic in the air.",
    background: "images/forest_of_magic.jpg",
    characters: [
      { file: "characters/hero.png", left: 200, bottom: 100, name: "Hero" }
    ],
    items: [
      { file: "items/crystal.png", name: "Crystal", offsetX: 400, offsetY: 100 }
    ],
    choices: [
      { text: "Take the crystal", next: "outside_house" },
      { text: "Leave it", next: "start" }
    ]
  },
  forest_dark_road: {
    text: "The road is dangerous… you sense eyes watching you. A creature appears!",
    background: "images/forest_of_magic_dark_road.jpg",
    characters: [
      { file: "characters/hero.png", left: 200, bottom: 100, name: "Hero" },
      { file: "characters/forest_creature.png", left: 500, bottom: 100, name: "Forest Creature" }
    ],
    items: [],
    choices: [
      { text: "Fight", next: "bad_ending" },
      { text: "Run away", next: "start" }
    ]
  },
  outside_house: {
    text: "You arrive outside the house of magic.",
    background: "images/outside_house_of_magic.jpg",
    characters: [
      { file: "characters/hero.png", left: 200, bottom: 100, name: "Hero" },
      { file: "characters/magician.png", left: 500, bottom: 100, name: "Magician Eldrin" }
    ],
    items: [],
    choices: [
      { text: "Enter the house", next: "house" },
      { text: "Walk away", next: "neutral_ending" }
    ]
  },
  house: {
    text: "Inside the house, Magician Eldrin greets you. He asks for the crystal.",
    background: "images/house_of_magic.jpg",
    characters: [
      { file: "characters/hero.png", left: 200, bottom: 100, name: "Hero" },
      { file: "characters/magician.png", left: 500, bottom: 100, name: "Magician Eldrin" }
    ],
    items: [],
    choices: [
      { text: "Give him the crystal", next: "good_ending" },
      { text: "Refuse", next: "bad_ending" }
    ]
  },
  good_ending: {
    text: "With your help, Eldrin uses the crystal to save the village. Good ending!",
    background: "images/village.jpg",
    characters: [
      { file: "characters/hero.png", left: 300, bottom: 100, name: "Hero" },
      { file: "characters/villager.png", left: 500, bottom: 100, name: "Villager" }
    ],
    items: [],
    choices: []
  },
  bad_ending: {
    text: "Darkness takes over… you have met a tragic fate.",
    background: "images/forest_dark_road.jpg",
    characters: [
      { file: "characters/hero.png", left: 200, bottom: 100, name: "Hero" },
      { file: "characters/forest_creature.png", left: 500, bottom: 100, name: "Forest Creature" }
    ],
    items


