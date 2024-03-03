const poke_container = document.getElementById('poke-container')
const pokemon_count = 150

const colors = {
  fire: [ '#FDDFDF', '#F08030'],
  water: [ '#6495ED', '#00FFFF'],
  grass: [ '#7FFF00', '#32CD32'],
  electric: ['#FACC15', '#FFD700'],
  normal: ['#A8A878', '#C0C0C0'], 
  fighting: ['#C03028', '#e6e0d4'],
  psychic: ['#FF69B4', '#F0B6BC'],
  poison: ['#A040A0', '#98d7a5'],
  ground: ['#E9967A', '#D2B48C'],
  flying: ['#A9A9F5', '#87CEFA'], 
  bug: ['#A8B820', '#7FFF00'],
  rock: ['#B8860B', '#A9817A'],
  ghost: ['#705898', '#A9A9F5'],
  dragon: ['#7038F8', '#97b3e6'],
  dark: ['#705848', '#000000'],
  steel: ['#B8B8D0', '#707070'], 
  fairy: ['#EE99EE', '#FFCBDB']
};

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
        
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEle = document.createElement('div')
    pokemonEle.classList.add('pokemon')

    
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')
    // console.log(pokemon.types)
    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    // console.log(poke_types)
    const color = colors[type]

    pokemonEle.style.backgroundColor = color[1]
    console.log(colors)

    const pokemonInnerHTML = `
            <div class="img-container">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
            </div>
            <div class="info"><span class="number">${id}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Type: <span>${type}</span></small>
            </div>`

    pokemonEle.innerHTML = pokemonInnerHTML
    poke_container.appendChild(pokemonEle)
}

fetchPokemons()