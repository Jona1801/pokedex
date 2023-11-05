const listaPokemon = document.querySelector('#listaPokedex');
const botonesMenu = document.querySelectorAll('.btn-menu');
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 200; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(pokd) {

    let tipos =pokd.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokdId = pokd.id.toString();
    if (pokdId.length === 1){
        pokdId = "0" + pokdId;
    } else if (pokdId.length === 2) {
        pokdId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokemon-img">
            <img src="${pokd.sprites.other["official-artwork"].front_default}" alt="${pokd.name}">            
        </div>
        <div class="pokemon-info">
            <div class="wrap-nombre">
                <p class="pokemon-id">#${pokdId}</p>
                <h2 class="pokemon-nombre">${pokd.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${pokd.height}m</p>
                <p class="stat">${pokd.weight}kg</p>
            </div>
        </div>
        `;

        listaPokemon.append(div)
}

botonesMenu.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 199; i++){
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "verTodos") {
                    mostrarPokemon(data);
                } else {
                    const tipos =data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))){
                        mostrarPokemon(data);
                    }
                }
                
            })
    }
}))