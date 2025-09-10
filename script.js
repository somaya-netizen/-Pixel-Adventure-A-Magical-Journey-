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

// Show characters
function showCharacters(chars) {
  charactersContainer.innerHTML = "";
  chars.forEach(c => {
    const img = document.createElement("img");
    img.src = c.file;
    img.style.left = c.left + "px";
    img.style.bottom = c.bottom + "px";
    img.alt = c.name;
    charactersContainer.appendChild(img);
  });
}

// Show items
function showItems(items) {
  itemsContainer.innerHTML = "";
  items.forEach(i => {
    const img = document.createElement("img");
    img.src = i.file;
    img.style.left = (i.offsetX || 400) + "px";
    img.style.bottom = (i.offsetY || 120) + "px";
    img.alt = i.name;
    itemsContainer.appendChild(img);
  });
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
    background: "images/forest_of_magic.jpg",
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
    items: [{file:"items/map.png", name:"Magic Map", offsetX:450, offsetY:120}],
    choices: [
      { text: "Pick up the map", next: "outside_house", action: () => addItem({name:"Magic Map"}) },
      { text: "Ignore it and go back", next: "start" }
    ]
  },
  forest_of_magic: {
    text: "Glowing crystals light up the forest. You feel magic in the air.",
    background: "images/forest_of_magic_dark_road.jpg",
    characters: [{file:"characters/hero.png", name:"Hero", left:400, bottom:100}],
    items: [{file:"items/crystal.png", name:"Crystal", offsetX:450, offsetY:120}],
    choices: [
      { text: "Take the crystal", next: "outside_house", actio_




