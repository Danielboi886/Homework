'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Sorry please try again');
  }
  const data = await response.json();
  return data;
}

async function fetchAndPopulatePokemons() {
  const pokemonData = fetchData('https://pokeapi.co/api/v2/pokemon?limit=151');
  const selectionMenu = document.createElement('select');
  document.body.appendChild(selectionMenu);
  selectionMenu.setAttribute('id', 'selection_menu');
  selectionMenu.style.display = 'block';
  selectionMenu.style.margin = '30px';
  pokemonData.then((data) => {
    const pokemonArray = data.results;
    console.log(pokemonArray);
    populatePokemonName(pokemonArray);
  });
  const populatePokemonName = (pokemonArray) => {
    pokemonArray.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const nameHolder = document.createElement('option');
      nameHolder.value = pokemonName;
      nameHolder.textContent = pokemonName;
      selectionMenu.appendChild(nameHolder);
    });
  };
  const pokemonImage = document.createElement('img');
  pokemonImage.setAttribute('id', 'pokemon_image');
  pokemonImage.src = '';
  pokemonImage.alt = '';
  pokemonImage.style.display = 'block';
  pokemonImage.style.margin = '30px';
  document.body.appendChild(pokemonImage);
  fetchImage();
}

async function fetchImage(url) {
  const pokemonMenu = document.getElementById('selection_menu');
  pokemonMenu.addEventListener('change', (event) => {
    url = `https://pokeapi.co/api/v2/pokemon/${event.target.value}`;
    getImageLink(url);
  });
  async function getImageLink(url) {
    fetchData(url).then((pokemonProfile) => {
      const pokemonImageURL = pokemonProfile.sprites.front_default;
      populateImage(pokemonProfile, pokemonImageURL);
    });
  }
  async function populateImage(profile, url) {
    const pokemonImage = document.getElementById('pokemon_image');
    pokemonImage.alt = profile.name;
    pokemonImage.src = url;
  }
}

async function main() {
  const button = document.createElement('button');
  button.textContent = 'Get Pokemon!';
  button.type = 'button';
  button.id = 'pokemon-button';
  button.style.display = 'block';
  button.style.margin = '30px';
  document.body.appendChild(button);
  button.addEventListener('click', function () {
    fetchAndPopulatePokemons();
  });
}

window.addEventListener('load', main);
