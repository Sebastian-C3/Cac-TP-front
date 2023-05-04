const API_KEY = '?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX';
const API_URL = 'https://api.themoviedb.org/3/';
const API_IMG = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
const IMG_CAST = 'https://www.themoviedb.org/t/p/w138_and_h175_face'

const detalle = document.getElementById('contenido-principal');
const reparto = document.getElementById('reparto-conteiner');
const trailer = document.getElementById('contenedor-trailer');


// obtén el parámetro "id" de la URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const mediaType = urlParams.get('type')

tipoMedia(mediaType);



function tipoMedia(tipo) {
  if (tipo == 'movie') {
    //console.log('peli');
    fetch(API_URL + mediaType + '/' + id + API_KEY).then(res => res.json()).then(data => {
     // console.log(data);
      mostrarPeli(data);
    })

    
  } else {
    //console.log('serie');
    fetch(API_URL + mediaType + '/' + id + API_KEY).then(res => res.json()).then(data => {
      console.log(data);
      mostrarSerie(data);

    })
  }
}

function mostrarPeli(data) {
  //console.log(data);
  detalle.innerHTML = ``;
  const elemento = document.createElement('div');
  elemento.classList.add('contenido');
  elemento.innerHTML = `    
    <div class="cartel">
        <img src="${imagenTarjeta(API_IMG,data.poster_path)}" alt="${data.title}">
    </div>
    <div class="titulo"><h2>${data.title}</h2></div>
    <div class="genero">
        <div class="generos"><p>${getGeneros(data.genres)}</p></div>
        <div class="duracion"><p>${getDuracion(data.runtime)}</p></div>
    </div>
    
    <div class="descripcion">
        <h3 class="h3">Sinopsis</h3>
        <p class="p">${data.overview}</p>
    </div>
    `;
  detalle.appendChild(elemento);
}

function mostrarSerie(data){
  detalle.innerHTML = ``;

      const elemento = document.createElement('div');
      elemento.classList.add('contenido');
      elemento.innerHTML = `    
    <div class="cartel">
        <img src="${imagenTarjeta(API_IMG,data.poster_path)}" alt="${data.name}">
    </div>
    <div class="titulo"><h2>${data.name}</h2></div>
    <div class="genero">
        <div class="generos">${getGeneros(data.genres)}</div>
    </div>
    
    <div class="descripcion">
        <h3 class="h3">Sinopsis</h3>
        <p class="p">${data.overview}</p>
    </div>
    `;
      detalle.appendChild(elemento);
}

function getGeneros(gen) {
  //console.log(gen);
  let generos = gen.map(gen => { return gen.name })
 //console.log(generos);
  return generos;
}

function getDuracion(minutos) {
  //console.log(minutos);
  let horas = Math.floor(minutos / 60);
  minutos = minutos % 60;
  return horas + "h" + " " + minutos + "m"
}

fetch(API_URL+mediaType+'/'+id+'/credits'+API_KEY).then(res => res.json()).then(dataCast => {
      //console.log(dataCast);
      mostrarReparto(dataCast.cast);
})

function mostrarReparto(dataCast){
  console.log(dataCast);

  for (let i = 0; i < dataCast.length; i++) {
    //const personaje = dataCast[i].character;
    //const actor = dataCast[i].name;
    //const imagen = dataCast[i].profile_path;
    let divReparto = document.createElement('div');
    divReparto.classList.add('reparto-tarjeta');
    divReparto.innerHTML = `
    <div class="reparto-img"><img src="${imagenTarjeta(IMG_CAST,dataCast[i].profile_path)}" alt="${dataCast[i].name}"></div>
    <div class="reparto-actor"><p class="p-actor">${dataCast[i].name}</p></div>
    <div class="reparto-papel"><p>${dataCast[i].character}</p></div>
    `
    reparto.appendChild(divReparto);
  }
}

fetch(API_URL+mediaType+'/'+id+'/videos'+API_KEY).then(res => res.json()).then(dataTrailer =>{

  let trailerKey = dataTrailer.results.find(dataTrailer => dataTrailer.type === 'Trailer')
  //console.log(trailerKey.key)
  let divTrailer = document.createElement('div');
  divTrailer.classList.add('trailer');
  divTrailer.innerHTML = `
  <div id="player"><iframe width="720" height="405" src="https://www.youtube.com/embed/${trailerKey.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  `
  trailer.appendChild(divTrailer);
})


function imagenTarjeta(img,profile_path){
  let desconocido = "img/unknown.png";
  if(profile_path===null){
    return desconocido
  }else{
    return img+profile_path
  }
}