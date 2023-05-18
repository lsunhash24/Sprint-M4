const searchInput = document.getElementById("search");
const pokedexContainer = document.getElementById("pokedex");

function showError(msg) {
  pokedexContainer.innerHTML = ` 
  <p class="error">${msg}</p>
  `;
}

async function searchPokemon() {
  const searchedPokemon = searchInput.value.toLowerCase();

  try {
    const response = await fetch(URL + searchedPokemon);
    const data = await response.json();

    if (!response.ok) {
      showError(`Not found any pokemon: ${searchPokemon}`);
      return;
    }

    pokedexContainer.innerHTML = `

    <h2>${data.name.toUpperCase()}</h2>
  <img src="${data.sprites.front_default}" alt="${data.id}" />
  <p>Number:${data.id}</p>
  <p>Height:${data.height / 10}m</p>
  <p>Weight:${data.weight / 10}kg</p>
  `;
  } catch (error) {
    console.log(error);
    showError("Error search pokemon");
  }
}

document.getElementById("btn").addEventListener("click", searchPokemon);