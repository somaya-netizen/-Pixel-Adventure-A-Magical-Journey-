const storyEl = document.getElementById("story");
const choicesEl = document.getElementById("choices");
const backgroundEl = document.getElementById("background");
const itemsContainer = document.getElementById("items-container");
const hero = document.getElementById("hero");

// Story data
const story = {
  start: {
    text: "You wake up in the village garden. The sun is shining. What will you do?",
    background: "images/village_garden.jpg",
    character: "characters/hero.png",
    items: ["items/magickey.png"],
    choices: [
      { text: "Go to the forest", next: "forest" },
      { text: "Go to the river", next: "river" }
    ]
  },
  forest: {
    text: "The forest is dark and mysterious. A path splits ahead.",
    background: "images/forest_of_magic.jpg",
    character: "characters/hero.png",
    items: ["items/crystal.png"],
    choices: [
      { text: "Take the bright path → Forest of Magic", next: "forest_of_magic" },
      { text: "Take the dark road", next: "forest_dark_road" }
    ]
  },
  river: {
    text: "At the river, you find a strange map floating in the water.",
    background: "images/river.jpg",
    character: "characters/hero.png",
    items: ["items/map.png"],
    choices: [
      { text: "Pick up the map", next: "outside_house" },
      { text: "Ignore it and go back", next: "start" }
    ]
  },
  forest_of_magic: {
    text: "Glowing crystals light up the forest. You feel magic in the air.",
    background: "images/forest_of_magic.jpg",
    character: "characters/hero.png",
    items: ["items/crystal.png"],
    choices: [
      { text: "Take the crystal", next: "outside_house" },
      { text: "Leave it", next: "start" }
    ]
  },
  forest_dark_road: {
    text: "The road is dangerous… you sense eyes watching you. A creature appears!",
    background: "images/forest_of_magic_dark_road.jpg",
    character: "characters/hero.png",
    items: [],
    choices: [
      { text: "Fight", next: "bad_ending" },
      { text: "Run away", next: "start" }
    ]
  },
  outside_house: {
    text: "You arrive outside the house of magic.",
    background: "images/outside_house_of_magic.jpg",
    character: "characters/hero.png",
    items: [],
    choices: [
      { text: "Enter the house", next: "house" },
      { text: "Walk away", next: "neutral_ending" }
    ]
  },
  house: {
    text: "Inside the house, Magician Eldrin greets you. He asks for the crystal.",
    background: "images/house_of_magic.jpg",
    character: "characters/hero.png",
    items: [],
    choices: [
      { text: "Give him the crystal", next: "good_ending" },
      { text: "Refuse", next: "bad_ending" }
    ]
  },
  good_ending: {
    text: "With your help, Eldrin uses the crystal to save the village. Good ending!",
    background: "images/village.jpg",
    character: "characters/hero.png",
    items: [],
    choices: []
  },
  bad_ending: {
    text: "Darkness takes over… you have met a tragic fate.",
    background: "images/forest_of_magic_dark_road.jpg",
    character: "characters/hero.png",
    items: [],
    choices: []
  },
  neutral_ending: {
    text: "You walk away from the adventure, never knowing what could have been.",
    background: "images/village.jpg",
    character: "characters/hero.png",
    items: [],
    choices: []
  }
};

// Show scene with smooth fade
function showScene(key) {
  const scene = story[key];

  // Fade out background
  backgroundEl.style.opacity = 0;

  setTimeout(() => {
    // Change background
    backgroundEl.style.backgroundImage = `url(${scene.background})`;
    // Fade in
    backgroundEl.style.opacity = 1;
  }, 300);

  // Hero
  hero.src = scene.character;

  // Items
  itemsContainer.innerHTML = "";
  scene.items.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "item";
    itemsContainer.appendChild(img);
  });

  // Story text
  storyEl.textContent = scene.text;

  // Choices
  choicesEl.innerHTML = "";
  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => showScene(choice.next);
    choicesEl.appendChild(btn);
  });
}

// Start game
showScene("start");

