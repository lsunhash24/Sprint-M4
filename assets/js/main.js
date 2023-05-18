const insertDOMcontent = document.querySelector('#insertDOMcontent'),
  formulario = document.querySelector('#formulario'),
  mensaje = document.querySelector('#mensaje'),
  contentSpinnerLoading = document.querySelector('.contentSpinnerLoading')
  contentSpinnerLoading.style.display = 'none',
  cargarMas = document.querySelector('#cargarMas'),
  pokemonChart = document.querySelector('#pokemon'),
  grafico = document.querySelector('#grafico'),
  contenedorGrafico = document.querySelector('#chart'),
  myModal = new bootstrap.Modal(document.querySelector('#mensajeModal'), {
    keyboard: false
  });
  

const url = 'https://pokeapi.co/api/v2/pokemon/'
let counter = 1;

const imprimirData = (infoPokemon) => {

  if (infoPokemon != undefined) {

    infoPokemon.forEach((element, index) => {
      // console.log(index);
      const {name,url} = element

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          response.json()
            .then((response) => {

              const { sprites,forms,types,stats,id } = response
               
              const imagen = {
                image3: sprites.other.dream_world.front_default
              }

              let placeHold = 'https://placehold.jp/300x400.png'
              insertDOMcontent.innerHTML += `<div class="col-12 col-md-3 my-3">
                                  <div class="card">
                                  <img src="${ imagen.image3 === 'N/A' ? placeHold : imagen.image3 }" alt="${name}" class="card-img-center">
                                      <div class="card-body">
                                        <h6 class="card-title">Id: ${id}</h6>                                 
                                        <button type="button" id="${id}" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chartModal">
                                            ${name}
                                        </button>
                                        
                                      </div>
                                    </div>
                                  </div>`

                  let botones = document.querySelectorAll('button')
                  
                    botones.forEach(function(element) {
                        element.addEventListener('click', function() {
   
                        // Código a ejecutar cuando se haga clic en el botón
                          let idBoton = element.getAttribute('id');
                    
                          chartPokemon(forms,types,stats,id);
                            
                       })

                 })

            })              
      })

      .catch(error => {
        myModal.toggle()
        mensaje.innerHTML = `<p>${error}</p>`
        setTimeout(() => {
          myModal.toggle()
        }, 5000);
      })

    })   
  }
}
   


const mostrarPokemones = () => {
  contentSpinnerLoading.style.display = 'flex'
  // Conectandonos con FETCH y FETCH es una promesa

  fetch(`${url}`)
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
          contentSpinnerLoading.style.display = 'none'
        })
    })
      .catch(error => {
        myModal.toggle()
        mensaje.innerHTML = `<p>${error}</p>`
        setTimeout(() => {
          myModal.toggle()
        }, 5000);
      })
}

mostrarPokemones();

const chartPokemon = (forms, types, stats, id) => {
  // const contenedorChart = document.querySelector('#chart');
  // const mensaje2 = document.querySelector('#mensaje2');
  // fetch('https://pokeapi.co/api/v2/pokemon/1') 
  //    .then(response => {
  //      if (!response.ok) {
  //        throw new Error(`HTTP error! status: ${response.status}`)
  //      }
  //      response.json()
  //        .then(data => {
          //  console.log(data);
          //      const { forms, types, stats } = data;
          //        console.log(forms[0].name);
               const datos = {
                  nombre: forms[0].name
                }
            myModal.toggle();
             mensaje.innerHTML = `
               <h2>${datos.nombre} Id:${id}</h2>
               <p>Types: ${types.map(type => type.type.name).join(', ')}</p>
                <p>Stats:</p>
               <ul>
                 ${stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
               </ul>`

               grafico.innerHTML = ``
        
              myModal.toggle();
                
                                 new Chart('grafico', {
                                    type: 'pie',
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
                                          '#FFCE56',
                                        ]
                                      }]
                                    }
                                  });
                      
          //  myModal.toggle();
        //   });
        // }) 

        //  .catch(error => {
        //    myModal.toggle()
        //    mensaje.innerHTML = `<p>${error}</p>`
        //     setTimeout(() => {
        //      myModal.toggle()
        //  }, 5000);
        //  })
         

     };
           
  