const story = {
    start: {
        text: "Welcome to Pixel Adventure! What is your name, hero?",
        img: "images/village_garden.jpg",
        choices: [
            { text: "Enter Name", action: enterName }
        ]
    },
    village_garden: {
        text: "You are in the village garden. Villager Anna approaches you.",
        img: "images/village_garden.jpg",
        choices: [
            { text: "Go to the river", next: "river" },
            { text: "Go to the forest", next: "forest" }
        ]
    },
    river: {
        text: "You arrive at the river. You find a map!",
        img: "images/river.jpg",
        choices: [
            { text: "Take the map", next: "outside_house_of_magic" },
            { text: "Ignore it", next: "forest" }
        ]
    },
    forest: {
        text: "You enter the forest.",
        img: "images/forest_of_magic.jpg",
        choices: [
            { text: "Take the dark road", next: "forest_dark_road" },
            { text: "Go deeper into the magic forest", next: "forest" }
        ]
    }
};

let playerName = "Hero";

function enterName() {
    playerName = prompt("Enter your hero's name:");
    goToScene("village_garden");
}

function goToScene(sceneName) {
    const scene = story[sceneName];
    document.getElementById("story-text").innerText = scene.text.replace("[player_name]", playerName);
    document.getElementById("background").src = scene.img;

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    scene.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerText = choice.text;
        btn.onclick = () => {
            if(choice.next) goToScene(choice.next);
            if(choice.action) choice.action();
        }
        choicesDiv.appendChild(btn);
    });
}

// Start the game
goToScene("start");


