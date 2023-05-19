
const insertDOMcontent = document.querySelector('#insertDOMcontent'),
  mensaje = document.querySelector('#mensaje'),
  grafico = document.querySelector('#grafico'),
  botonPagina = document.querySelector('#buttons'),
  ventana = new bootstrap.Modal(document.querySelector('#myModal'), {
     keyboard: false
   });

let url = 'https://pokeapi.co/api/v2/pokemon';

let botonAnterior;
let botonSiguiente;

const imprimirData = async (infoPokemon) => {
  let arreglo = [];
  insertDOMcontent.innerHTML = ""; 

  if (infoPokemon != undefined) {

      for(const detalle of infoPokemon) {   

      try {  
        const contenido = await fetch(detalle.url)
          const response = await contenido.json()
     
            const { abilities,sprites,stats,id,name,types } = response
               
            const pokeDatos = {
                imagen: sprites.other.dream_world.front_default,
                nombre: name,
                idPoke: id,
                habilidad: abilities,
                estadisticas: stats,
                tipo: types
            }

              let placeHold = 'https://placehold.jp/300x400.png'
              insertDOMcontent.innerHTML += `<div class="col-md-3 my-3 col-12">
                                                <div class="card">
                                                  <img loading="lazy" src="${ pokeDatos.imagen === 'N/A' ? placeHold : pokeDatos.imagen }" alt="${pokeDatos.nombre}" class="card-img-center">
                                                    <div class="card-body">
                                                     <h6 class="card-title">Id: ${id}</h6>                                 
                                                      <button type="button" id="${id}" class="btn btn-primary">
                                                       ${pokeDatos.nombre}
                                                      </button>
                                        
                                                    </div>
                                                </div>
                                              </div>`                   
              arreglo.push(pokeDatos);   

      } catch(error) {
              mensaje.innerHTML = `<p>${error}</p>`
               setTimeout(() => {
                 ventana.show();
               }, 5000);
       }       
    }   
  } 

  chartPokemon(arreglo);
    
}
  
const mostrarPokemones = (url) => {

  fetch(url)
    .then(response => {

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      response.json()
        .then(data => {
          const {
            results
          } = data
          
          imprimirData(results)
          // contentSpinnerLoading.style.display = 'none'
              botonAnterior = data.previous ? `<button class="btn btn-warning mx-2" data-url=${data.previous}>⏮</button>` : ''
              botonSiguiente = data.next ? `<button class="btn btn-warning" data-url=${data.next}>⏩</button>` : ''
              botonPagina.innerHTML = `${botonAnterior}   ${botonSiguiente}`;

        })
    })
      .catch(error => {
        mensaje.innerHTML = `<p>${error}</p>`
        setTimeout(() => {
          ventana.show;
        }, 5000);
      })
}

mostrarPokemones(url);

const chartPokemon = ( arreglo ) => {

  let botones = document.querySelectorAll('div.col-md-3.my-3 button');
       
  botones.forEach((element) => {
   
    element.addEventListener('click', (e) => {
      e.preventDefault();
   
      let idBoton = element.getAttribute('id');
     
      let pokemon = arreglo.find( element => element.idPoke == idBoton);

           const { habilidad, tipo, estadisticas, idPoke, nombre } = pokemon

             mensaje.innerHTML = `<h2 style="color:#613cac;;">${nombre} Id:${idPoke}</h2>
               <p>Tipo: ${tipo.map(type => type.type.name).join(', ')}</p>
               <p>Habilidades: ${habilidad.map(ability => ability.ability.name).join(', ')}</p>     
               <p>Estadisticas:</p>`

              new Chart('grafico', {
                type: 'polarArea',
                data: {
                  labels: estadisticas.map(stat => stat.stat.name),
                  datasets: [{
                    data: estadisticas.map(stat => stat.base_stat),
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      'green',
                      '#613cac',
                      '#D35400',
                    ]
                  }]
                }
              });  
              
      ventana.show();      
    })
  })
}  

botonPagina.addEventListener('click', (e) => {
  
  mostrarPokemones(e.target.dataset.url)
})
  


  