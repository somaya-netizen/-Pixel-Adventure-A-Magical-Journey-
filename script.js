const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");
const backgroundElement = document.getElementById("background");
const characterElement = document.getElementById("character");

// The story nodes
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
    background: "backgrounds/forest.jpg",
    character: "characters/forest_creature.png",
    choices: [
      { text: "Take the bright path → Forest of Magic", next: "forest_of_magic" },
      { text: "Take the dark road", next: "forest_dark_road" }
    ]
  },
  river: {
    text: "At the river, you find a strange map floating in the water.",
    background: "backgrounds/river.jpg",
    character: "characters/villager.png",
    choices: [
      { text: "Pick up the map", next: "outside_house" },
      { text: "Ignore it and go back", next: "start" }
    ]
  },
  forest_of_magic: {
    text: "Glowing crystals light up the forest. You feel magic in the air.",
    background: "backgrounds/forest_of_magic.jpg",
    character: "characters/hero.png",
    choices: [
      { text: "Take the crystal", next: "outside_house" },
      { text: "Leave it", next: "start" }
    ]
  },
  forest_dark_road: {
    text: "The road is dangerous… you sense eyes watching you. A creature appears!",
    background: "backgrounds/forest_dark_road.jpg",
    character: "characters/forest_creature.png",
    choices: [
      { text: "Fight", next: "bad_ending" },
      { text: "Run away", next: "start" }
    ]
  },
  outside_house: {
    text: "You arrive outside the house of magic.",
    background: "backgrounds/outside_house_of_magic.jpg",
    character: "characters/magician.png",
    choices: [
      { text: "Enter the house", next: "house" },
      { text: "Walk away", next: "neutral_ending" }
    ]
  },
  house: {
    text: "Inside the house, Magician Eldrin greets you. He asks for the crystal.",
    background: "backgrounds/house_of_magic.jpg",
    character: "characters/magician.png",
    choices: [
      { text: "Give him the crystal", next: "good_ending" },
      { text: "Refuse", next: "bad_ending" }
    ]
  },
  good_ending: {
    text: "With your help, Eldrin uses the crystal to save the village. Good ending!",
    background: "backgrounds/village.jpg",
    character: "characters/villager.png",
    choices: []
  },
  bad_ending: {
    text: "Darkness takes over… you have met a tragic fate.",
    background: "backgrounds/forest_dark_road.jpg",
    character: "characters/forest_creature.png",
    choices: []
  },
  neutral_ending: {
    text: "You walk away from the adventure, never knowing what could have been.",
    background: "backgrounds/village.jpg",
    character: "characters/hero.png",
    choices: []
  }
};

// Function to show a scene
function showScene(sceneKey) {
  const scene = story[sceneKey];
  storyElement.textContent = scene.text;
  backgroundElement.style.backgroundImage = `url(${scene.background})`;
  characterElement.src = scene.character;

  choicesElement.innerHTML = "";
  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => showScene(choice.next);
    choicesElement.appendChild(button);
  });
}

// Start the game
showScene("start");
