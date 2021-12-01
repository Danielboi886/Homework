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
const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';

async function fetchData() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('ERROR');
  }
  const responseData = await response.json();
  return responseData;
}
async function fetchAndPopulatePokemons(data) {
  const dataArray = data.results;
  const pokemonMenu = document.getElementById('pokemon-menu');
  dataArray.forEach((pokemon) => {
    const name = pokemon.name;
    const pokemonName = document.createElement('option');
    pokemonName.value = name;
    pokemonName.textContent = name;
    pokemonMenu.appendChild(pokemonName);
  });
  pokemonMenu.addEventListener('change', (event) => {
    const pokemonProfilePageURL = `https://pokeapi.co/api/v2/pokemon/${event.target.value}`;
    console.log(pokemonProfilePageURL);
    fetchImage(pokemonProfilePageURL);
  });
}

function createDOMelement() {
  const button = document.createElement('button');
  button.textContent = 'Get Pokemon!';
  button.type = 'button';
  button.id = 'pokemon-button';
  document.body.appendChild(button);
  const pokemonMenu = document.createElement('select');
  pokemonMenu.id = 'pokemon-menu';
  document.body.appendChild(pokemonMenu);
  const pokemonImagePlaceHolder = document.createElement('img');
  pokemonImagePlaceHolder.id = 'pokemon-image';
  pokemonImagePlaceHolder.alt = '';
  pokemonImagePlaceHolder.src = ' ';
  document.body.appendChild(pokemonImagePlaceHolder);
  button.style.display = 'block';
  button.style.margin = '30px';
  pokemonMenu.style.display = 'block';
  pokemonMenu.style.margin = '30px';
  pokemonImagePlaceHolder.style.display = 'block';
  pokemonImagePlaceHolder.style.margin = '30px';
}

async function fetchImage(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  console.log(responseData);
  const imageURL = responseData.sprites.front_default;
  const pokemonImage = document.getElementById('pokemon-image');
  pokemonImage.alt = responseData.name;
  pokemonImage.src = imageURL;
}

async function main() {
  createDOMelement();
  try {
    const pokemonButton = document.getElementById('pokemon-button');
    const result = await fetchData();
    pokemonButton.addEventListener('click', function () {
      fetchAndPopulatePokemons(result);
    });
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);
