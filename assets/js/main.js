const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
let allPokemons = []

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
            <button class="show-moves" onclick="openModal(${pokemon.number})">Show moves</button>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        allPokemons = allPokemons.concat(pokemons);
        pokemonList.innerHTML += newHtml
    })
}

function closeModal(){
    const modal = document.querySelector('.overlay');
    modal.parentElement.removeChild(modal);
}

function openModal(id) {
    const pokemon = allPokemons.find(pokemon => pokemon.number == id);
    const html = `
        <div class="overlay">
            <div class="modal">
                <header>
                    <h4 class="name">${pokemon.name} - moves</h4>
                    <span class="close-modal" onclick="closeModal()">X</span>
                </header>
                <div class="main">
                    <ol class="moves">
                        ${pokemon.moves.map((move) => `<li class="move">${move.move.name}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `;
    document.querySelector('body').insertAdjacentHTML('beforeend', html);
    console.log(id);
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})