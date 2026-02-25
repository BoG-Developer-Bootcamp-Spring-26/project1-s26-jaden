const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
};

let currentPokemonId = 132;
let currentTab = "info";
let currentPokemonData = null;

// divs
const spriteImg = document.getElementById("sprite-img");
const pokemonName = document.getElementById("pokemon-name");
const typesContainer = document.getElementById("types-container");
const panelContent = document.getElementById("panel-content");

// arrows
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

// button tabs
const infoTab = document.getElementById("info-tab");
const movesTab = document.getElementById("moves-tab");

// arrow event listeners
leftArrow.addEventListener("click", () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
});

rightArrow.addEventListener("click", () => {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
});

// button event listeners to switch color of button
infoTab.addEventListener("click", () => {
    currentTab = "info";
    updateActiveTab();
    renderPanel();
});

movesTab.addEventListener("click", () => {
    currentTab = "moves";
    updateActiveTab();
    renderPanel();
});

function updateActiveTab() {
    infoTab.classList.toggle("active", currentTab === "info");
    movesTab.classList.toggle("active", currentTab === "moves");
}

async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        currentPokemonData = data;
        renderPokemon(data);
    } catch (error) {
        console.error("Pokemon not found:", error);
    }
}

function renderPokemon(data) {
    spriteImg.src = data.sprites.front_default;
    pokemonName.textContent = data.name;
    renderTypes(data.types);
    renderPanel();
}

function renderTypes(types) {
    typesContainer.innerHTML = "";

    types.forEach(typeObj => {
        const typeName = typeObj.type.name;
        const button = document.createElement("button");
        button.textContent = typeName;
        button.classList.add("type-button");
        button.style.backgroundColor = typeColors[typeName];
        typesContainer.appendChild(button);
    });
}

function renderPanel() {
    if (currentTab === "info") {
        renderInfo(currentPokemonData);
    } else {
        renderMoves(currentPokemonData);
    }
}

function renderInfo(data) {
    panelContent.innerHTML = `
        <p>Height: ${data.height / 10}m</p>
        <p>Weight: ${data.weight / 10}kg</p>
        <p>HP: ${data.stats[0].base_stat}</p>
        <p>Attack: ${data.stats[1].base_stat}</p>
        <p>Defense: ${data.stats[2].base_stat}</p>
        <p>Special Attack: ${data.stats[3].base_stat}</p>
        <p>Special Defense: ${data.stats[4].base_stat}</p>
        <p>Speed: ${data.stats[5].base_stat}</p>
    `;
}

function renderMoves(data) {
    panelContent.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        panelContent.innerHTML += `<p>${data.moves[i].move.name}</p>`;
    }
}

fetchPokemon(currentPokemonId);