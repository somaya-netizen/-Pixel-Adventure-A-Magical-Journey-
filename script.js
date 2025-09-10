const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");
const backgroundElement = document.getElementById("background");
const charactersContainer = document.getElementById("characters-container");
const itemsContainer = document.getElementById("items-container");
const inventoryList = document.getElementById("inventory-list");

let inventory = [];

// Function to add item to inventory
function addItem(item) {
  inventory.push(item.name);
  inventoryList.innerHTML = inventory.map(i => `<li>${i}</li>`).join("");
}

// Story data
const story = {
  start: {
    text: "You wake up in the village garden. The sun is shining. What will you do?",
    background: "images/village_garden.jpg",
    characters: [{file:"characters/hero.png", name:"Hero"}],
    items: [],
    choices: [
      { text: "Go to the forest", next: "forest" },
      { text: "Go to the river", next: "river" }
    ]
  },
  forest: {
    text: "The forest is dark and mysterious. A path splits ahead.",
    background: "images/forest.jpg",
    characters: [{file:"characters/forest_creature.png", name:"Forest Creature"}],
    items: [],
    choices: [
      { text: "Take the bright path → Forest of Magic", next: "forest_of_magic" },
      { text: "Take the dark road", next: "forest_dark_road" }
    ]
  },
  river: {
    text: "At the river, you find a strange map floating in the water.",
    background: "images/river.jpg",
    characters: [{file:"characters/villager.png", name:"Villager"}],
    items: [{file:"items/map.png", name:"Magic Map"}],
    choices: [
      { text: "Pick up the map", next: "outside_house", action: () => addItem({name:"Magic Map"}) },
      { text: "Ignore it and go back", next: "start" }
    ]
  },
  forest_of_magic: {
    text: "Glowing crystals light up the forest. You feel magic in the air.",
    background: "images/forest_of_magic_dark_road.jpg",
    characters: [{file:"characters/hero.png", name:"Hero"}],
    items: [{file:"items/crystal.png", name:"Crystal"}],
    choices: [
      { text: "Take the crystal", next: "outside_house", action: () => addItem({name:"Crystal"}) },
      { text: "Leave it", next: "start" }
    ]
  },
  forest_dark_road: {
    text: "The road is dangerous… you sense eyes watching you. A creature appears!",
    background: "images/forest_of_magic_dark_road.jpg",
    characters: [{file:"characters/forest_creature.png", name:"Forest Creature"}],
    items: [],
    choices: [
      { text: "Fight", next: "bad_ending" },
      { text: "Run away", next: "start" }
    ]
  },
  outside_house: {
    text: "You arrive outside the house of magic.",
    background: "images/outside_house_of_magic.jpg",
    characters: [{file:"characters/magician.png", name:"Magician Eldrin"}],
    items: [],
    choices: [
      { text: "Enter the house", next: "house" },
      { text: "Walk away", next: "neutral_ending" }
    ]
  },
  house: {
    text: "Inside the house, Magician Eldrin greets you. He asks for the crystal.",
    background: "images/house_of_magic.jpg",
    characters: [{file:"characters/magician.png", name:"Magician Eldrin"}],
    items: [],
    choices: [
      { text: "Give him the crystal", next: "good_ending" },
      { text: "Refuse", next: "bad_ending" }
    ]
  },
  good_ending: {
    text: "With your help, Eldrin uses the crystal to save the village. Good ending!",
    background: "images/village.jpg",
    characters: [{file:"characters/villager.png", name:"Villager"}],
    items: [],
    choices: []
  },
  bad_ending: {
    text: "Darkness takes over… you have met a tragic fate.",
    background: "images/forest_of_magic_dark_road.jpg",
    characters: [{file:"characters/forest_creature.png", name:"Forest Creature"}],
    items: [],
    choices: []
  },
  neutral_ending: {
    text: "You walk away from the adventure, never knowing what could have been.",
    background: "images/village.jpg",
    characters: [{file:"characters/hero.png", name:"Hero"}],
    items: [],
    choices: []
  }
};

// Function to show a scene
function showScene(sceneKey) {
  const scene = story[sceneKey];
  storyElement.textContent = scene.text;

  // Background
  backgroundElement.style.backgroundImage = `url(${scene.background})`;

  // Characters
  charactersContainer.innerHTML = "";
  scene.characters.forEach((char, i) => {
    const img = document.createElement("img");
    img.src = char.file;
    img.alt = char.name;
    img.style.left = `${50 + i*120}px`; // space characters horizontally
    img.style.bottom = "100px";
    img.className = "character-multiple";
    charactersContainer.appendChild(img);
  });

  // Items
  itemsContainer.innerHTML = "";
  scene.items.forEach((item, i) => {
    const img = document.createElement("img");
    img.src = item.file;
    img.alt = item.name;
    img.style.left = `${100 + i*100}px`;
    img.style.bottom = "250px";
    img.className = "character-multiple";
    itemsContainer.appendChild(img);
  });

  // Choices
  choicesElement.innerHTML = "";
  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => {
      if (choice.action) choice.action(); // add item if action exists
      showScene(choice.next);
    };
    choicesElement.appendChild(button);
  });
}

// Start game
showScene("start");
