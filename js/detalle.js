import { imagenTarjeta, tipoMedia, tipoTitulo, API_URL, API_KEY } from "./index.js";

const API_IMG = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
const API_IMG_BACK = 'https://image.tmdb.org/t/p/w250_and_h141_bestv2'
const IMG_CAST = 'https://www.themoviedb.org/t/p/w138_and_h175_face'
const detalle = document.getElementById('contenido-principal');
const reparto = document.getElementById('reparto-conteiner');
const trailer = document.getElementById('contenedor-trailer');
const relacionados = document.getElementById('reparto-relacionados')

// obtén el parámetro "id" de la URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const mediaType = urlParams.get('type')

const getDetalle = async () => {
  try {
    let resDetalle = await fetch(API_URL + mediaType + '/' + id + API_KEY);
    let detalle = await resDetalle.json();
    mostrarDetalle(detalle);

    let resReparto = await fetch(API_URL + mediaType + '/' + id + '/credits' + API_KEY);
    let reparto = await resReparto.json();
    mostrarReparto(reparto.cast);

    let resSimilares = await fetch(API_URL + mediaType + '/' + id + '/similar' + API_KEY + '&page=1');
    let similares = await resSimilares.json();
    mostrarSimilares(similares);

    let resTrailer = await fetch(API_URL + mediaType + '/' + id + '/videos' + API_KEY);
    let trailer = await resTrailer.json();
    mostrarTrailer(trailer)

  } catch (error) {
    console.warn(error);
  }
}

getDetalle();

function mostrarDetalle(data) {
  detalle.innerHTML = ``;
  const elemento = document.createElement('div');
  elemento.classList.add('contenido');
  elemento.innerHTML = `    
    <div class="cartel">
        <img src="${imagenTarjeta(API_IMG, data.poster_path)}" alt="${tipoTitulo(data.title, data.name)}">
    </div>
    <div class="titulo"><h2>${tipoTitulo(data.title, data.name)}</h2></div>
    <div class="genero">
        <div class="generos">${getGeneros(data.genres)}</div>
        <div class="duracion"><p>${getDuracion(data.runtime)}</p></div>
    </div>
    
    <div class="descripcion">
        <h3 class="h3">Sinopsis</h3>
        <p class="p">${data.overview}</p>
    </div>
    `;
  detalle.appendChild(elemento);
}

function getGeneros(gen) {
  let generos = gen.map(gen => { return gen.name })
  let text = '';
  for (let index = 0; index < generos.length; index++) {
    text += '<p>' + '' + generos[index] + ' ' + '</p>'
  }
  return text;
}

function getDuracion(minutos) {
  let horas = Math.floor(minutos / 60);
  minutos = minutos % 60;
  if (minutos) {
    return horas + "h" + " " + minutos + "m"
  } else {
    return ''
  }
}

function mostrarReparto(dataCast) {
  for (let i = 0; i < dataCast.length; i++) {
    let divReparto = document.createElement('div');
    divReparto.classList.add('reparto-tarjeta');
    divReparto.innerHTML = `
    <div class="reparto-img"><img src="${imagenTarjeta(IMG_CAST, dataCast[i].profile_path)}" alt="${dataCast[i].name}"></div>
    <div class="reparto-actor"><p class="p-actor">${dataCast[i].name}</p></div>
    <div class="reparto-papel"><p>${dataCast[i].character}</p></div>
    `
    reparto.appendChild(divReparto);
  }
}

function mostrarTrailer(dataTrailer) {
  let trailerKey = dataTrailer.results.find(dataTrailer => dataTrailer.type === 'Trailer');
  let divTrailer = document.createElement('div');
  divTrailer.classList.add('trailer');
  divTrailer.innerHTML = `
  <div><h3 class="detalle-h3">Trailer</h3></div>
  <div id="player"><iframe width="720" height="405" src="https://www.youtube.com/embed/${trailerKey.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  `
  trailer.appendChild(divTrailer);
}

function mostrarSimilares(data) {
  document.getElementById('elemento-similar').innerHTML = `${tipoElemento(mediaType)}`
  relacionados.innerHTML = ``
  data.results.forEach(elemento => {
    let { id, name, backdrop_path, title } = elemento;
    let listaElemento = document.createElement('div');
    listaElemento.classList.add('similar-tarjeta');
    listaElemento.innerHTML = `
    <a href="detalle.html?type=${tipoMedia(title)}&id=${id}"> <div class="similar-backdrop"><img src="${imagenTarjeta(API_IMG_BACK, backdrop_path)}" alt="${tipoTitulo(title, name)}"></div> </a>
    <a href="detalle.html?type=${tipoMedia(title)}&id=${id}"> <div class="similar-titulo"><p class="similar-p">${tipoTitulo(title, name)}</p></div> </a>
    `
    relacionados.appendChild(listaElemento);
  })
}

function tipoElemento(mediaType) {
  if (mediaType === 'movie') {
    return 'Peliculas similares'
  } else {
    return 'Series similares'
  }
}