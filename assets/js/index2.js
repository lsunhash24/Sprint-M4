
// Definición de variables globales para seleccionar el DOM
const insertDOMcontent = document.querySelector('#insertDOMcontent'),
  form = document.querySelector('#form'),
  mensaje2 = document.querySelector('#mensaje2'),
  buscar = document.querySelector('#buscarPokemon'),
  ventana2 = new bootstrap.Modal(document.querySelector('#myModal2'));
   

let url = 'https://pokeapi.co/api/v2/pokemon';

form.addEventListener('submit', function(e){
    e.preventDefault();

    let idPoke = buscar.value;
    if(idPoke.length != 0) {
        encontrar(idPoke)
    }else{
        mensaje2.innerHTML = 'Ingrese un id válido de pokemon';
        ventana2.show();
    }
})

const encontrar = (id) => {

    insertDOMcontent.innerHTML = ""; 
    // Conectandonos con FETCH y FETCH es una promesa

  
    fetch(`${url}/${id}`)
      .then(response => {
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)

        }
  
        response.json()
          .then(data => {
            const { abilities,sprites,stats,id,name,types } = data
                 
              const pokeDatos = {
                  imagen: sprites.other.dream_world.front_default,
                  nombre: name,
                  idPoke: id,
                  habilidad: abilities,
                  estadisticas: stats,
                  tipo: types
              }
  
                let placeHold = 'https://placehold.jp/300x400.png'
                insertDOMcontent.innerHTML += `<div class="col-md-6 my-3 col-12">
                                                  <div class="card2">
                                                    <img id="imagenId" src="${ pokeDatos.imagen === 'N/A' ? placeHold : pokeDatos.imagen }" alt="${pokeDatos.nombre}" class="card-img-top">
                                                      <div class="card-body">
                                                       <h6 class="card2-title">Id: ${id}</h6>                                 
                                                        <button type="button" id="botonId" class="btn btn-primary">
                                                         ${pokeDatos.nombre}
                                                        </button>                                       
                                                      </div>
                                                  </div>
                                                </div>`
                let boton = document.querySelector('#botonId');  

                chartPokemon(abilities,stats,types,id,name,boton);
          })
      })
        .catch(error => {
          mensaje2.innerHTML = `<p>${error}</p>`
            setTimeout(() => {
         ventana2.show()
          }, 5000);
        })
  }
  

    
  const chartPokemon = ( abilities,stats,types,id,name,boton ) => {
     
      boton.addEventListener('click', (e) => {
        e.preventDefault();
    
               mensaje2.innerHTML = `<h2 style="color:#613cac;;">${name} Id:${id}</h2>
                 <p>Tipo: ${types.map(type => type.type.name).join(', ')}</p>
                 <p>Habilidades: ${abilities.map(ability => ability.ability.name).join(', ')}</p>     
                 <p>Estadisticas:</p>`

                //  ventana.show();
  
                new Chart('grafico2', {
                  type: 'polarArea',
                  data: {
                    labels: stats.map(stat => stat.stat.name),
                    datasets: [{
                      data: stats.map(stat => stat.base_stat),
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
                
        ventana2.show();     
      })
    }
 
  
