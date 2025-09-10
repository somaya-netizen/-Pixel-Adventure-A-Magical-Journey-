const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");
const backgroundElement = document.getElementById("background");
const charactersContainer = document.getElementById("characters-container");
const itemsContainer = document.getElementById("items-container");
const inventoryList = document.getElementById("inventory-list");

let inventory = [];

// Add item to inventory
function addItem(item) {
  if(!inventory.includes(item.name)){
    inventory.push(item.name);
    inventoryList.innerHTML = inventory.map(i => `<li>${i}</li>`).join("");
  }
}

// Smooth background change
function changeBackground(newBg) {
  backgroundElement.style.opacity = 0;
  setTimeout(() => {
    backgroundElement.style.backgroundImage = `url(${newBg})`;
    backgroundElement.style.opacity = 1;
  }, 500);
}

// Move character smoothly
function moveCharacter(charIndex, newLeft, newBottom, duration=800) {
  const char = charactersContainer.children[charIndex];
  char.style.transition = `left ${duration}ms linear, bottom ${duration}ms linear`;
  char.style.left = newLeft + "px";
  char.style.bottom = newBottom + "px";
}

// Story data
const story = {
  start: {
    text: "You wake up in the village garden. The sun is shining. What will you do?",
    background: "images/village_garden.jpg",
    characters: [{file:"characters/hero.png", name:"Hero", left:400, bottom:100}],
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
      {file:"characters/hero.png", name:"Hero", left:200, bottom:100},
      {file:"characters/forest_creature.png", name:"Forest Creature", left:600, bottom:100}
    ],
    items: [],
    choices: [
      { text: "Take the bright path → Forest of Magic", next: "forest_of_magic" },
      { text: "Take the dark road", next: "forest_dark_road" }
    ]
  },
  river: {
    text: "At the river, you find a strange map floating in the water.",
    background: "images/river.jpg",
    characters: [{file:"characters/hero.png", name:"Hero", left:400, bottom:100}],
    items: [{file:"items/map.png", name:"Magic Map", offsetX:50, offsetY:20}],
    choices: [
      { text: "Pick up the map", next: "outside_house", action: () => addItem({name:"Magic Map"}) },
      { text: "Ignore it and go back", next: "start" }
    ]
  },
  forest_of_magic: {
    text: "Glowing crystals light up the forest. You feel magic in the air.",
    background: "images/forest_of_magic_dark_road.jpg",
    characters: [{file:"characters/hero.png", name:"Hero", left:400, bottom:100}],
    items: [{file:"items/crystal.png", name:"Crystal", offsetX:50, offsetY:20}],
    choices: [
      { text: "Take the crystal", next: "outside_house", action: () => addItem({name:"Crystal"}) },
      { text: "Leave it", next: "start" }
    ]
  },
  forest_dark_road: {
    text: "The road is dangerous… you sense eyes watching you. A creature appears!",
    background: "images/forest_of_magic_dark_road.jpg",
    characters: [
      {file:"characters/hero.png", name:"Hero", left:200, bottom:100},
      {file:"characters/forest_creature.png", name:"Forest Creature", left:600, bottom:100}
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
      {file:"characters/hero.png", name:"Hero", left:300, bottom:100},
      {file:"characters/magician.png", name:"Magician Eldrin", left:600, bottom:100}
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
      {file:"characters/hero.png", name:"Hero", left:300, bottom:100},
      {file:"characters/magician.png", name:"Magician Eldrin", left:600, bottom:100}
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
    characters: [{file:"characters/villager.png", name:"Villager", left:400, bottom:100}],
    items: [],
    choices: []
  },
  bad_ending: {
    text: "Darkness takes over… you have met a tragic fate.",
    background: "images/forest_of_magic_dark_road.jpg",
    characters: [{file:"characters/forest_creature.png", name:"Forest Creature", left:400, bottom:100}],
    items: [],
    choices: []
  },
  neutral_ending: {
    text: "You walk away from the adventure, never knowing what could have been.",
    background: "images/village.jpg",
    characters: [{file:"characters/hero.png", name:"Hero", left:400, bottom:100}],
    items: [],
    choices: []
  }
};

// Show a scene
function show


