const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");
const backgroundElement = document.getElementById("images");
const characterElement = document.getElementById("character");
const inventoryList = document.getElementById("items");

// Player inventory
let inventory = [];

// Items definition
const items = {
  map: { file: "items/map.png", name: "Map" },
  crystal: { file: "items/crystal.png", name: "Crystal of Power" },
  magicKey: { file: "items/magickey.png", name: "Magic Key" },
  potion: { file: "items/potion.png", name: "Potion" }
};

// Story scenes
const story = {
  start: {
    text: "You wake up in the village garden. The sun is shining. What will you do?",
    background: "backgrounds/village_garden.jpg",
    character: "characters/villager.png",
    choices: [
      { text: "Go to the forest", next: "forest" },
      { text: "Go to the river", next: "river" }
    ]
  },
  forest: {
    text: "The forest is dark and mysterious. A path splits ahead.",
    background: "images/forest.jpg",
    character: "characters/forest_creature.png",
    choices: [
      { text: "Take the bright path → Forest of Magic", next: "forest_of_magic" },
      { text: "Take the dark road", next: "forest_dark_road" }
    ]
  },
  river: {
    text: "At the river, you find a strange map floating in the water.",
    background: "images/river.jpg",
    character: "characters/villager.png",
    choices: [
      { text: "Pick up the map", next: "outside_house", item: "map" },
      { text: "Ignore it and go back", next: "start" }
    ]
  },
  forest_of_magic: {
    text: "Glowing crystals light up the forest. You feel magic in the air.",
    background: "images/forest_of_magic.jpg",
    character: "characters/hero.png",
    choices: [
      { text: "Take the crystal", next: "outside_house", item: "crystal" },
      { text: "Leave it", next: "start" }
    ]
  },
  forest_dark_road: {
    text: "The dark road is dangerous… you sense eyes watching you. A creature appears!",
    background: "images/forest_of_magic_dark_road.jpg",
    character: "characters/forest_creature.png",
    choices: [
      { text: "Fight", next: "bad_ending" },
      { text: "Run away", next: "start" }
    ]
  },
  outside_house: {
    text: "You arrive outside the house of magic.",
    background: "images/outside_house_of_magic.jpg",
    character: "characters/magician.png",
    choices: [
      { text: "Enter the house", next: "house" },
      { text: "Walk away", next: "neutral_ending" }
    ]
  },
  house: {
    text: "Inside the house, Magician Eldrin greets you. He asks for the crystal.",
    background: "images/house_of_magic.jpg",
    character: "characters/magician.png",
    choices: [
      { text: "Give him the crystal", next: "good_ending", require: "crystal" },
      { text: "Refuse", next: "bad_ending" }
    ]
  },
  good_ending: {
    text: "With your help, Eldrin uses the crystal to save the village. Good ending!",
    background: "images/village.jpg",
    character: "characters/villager.png",
    choices: []
  },
  bad_ending: {
    text: "Darkness takes over… you have met a tragic fate.",
    background: "images/forest_of_magic_dark_road.jpg",
    character: "characters/forest_creature.png",
    choices: []
  },
  neutral_ending: {
    text: "You walk away from the adventure, never knowing what could have been.",
    background: "images/village.jpg",
    character: "characters/hero.png",
    choices: []
  }
};

// Show scene
function showScene(sceneKey) {
  const scene = story[sceneKey];
  storyElement.textContent = scene.text;
  backgroundElement.style.backgroundImage = `url(${scene.images})`;
  characterElement.src = scene.character;

  choicesElement.innerHTML = "";

  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;

    button.onclick = () => {
      // Add item if present
      if (choice.item && !items.includes(items[choice.item].name)) {
        items.push(items[choice.item].name);
        updateInventory();
      }

      // Check requirement for scene
      if (choice.require && !inventory.includes(items[choice.require].name)) {
        alert(`You need ${items[choice.require].name} to do this!`);
      } else {
        showScene(choice.next);
      }
    };

    choicesElement.appendChild(button);
  });
}

// Update inventory display
function updateInventory() {
  inventoryList.innerHTML = "";
  inventory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    inventoryList.appendChild(li);
  });
}

// Start the game
showScene("start");

