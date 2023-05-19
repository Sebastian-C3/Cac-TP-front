const API_KEY = '?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX';
const API_URL = 'https://api.themoviedb.org/3/';
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

tipoMedia(mediaType);

function tipoMedia(tipo) {
  if (tipo == 'movie') {
    fetch(API_URL + mediaType + '/' + id + API_KEY).then(res => res.json()).then(data => {
      mostrarPeli(data);
    })
  } else {
    fetch(API_URL + mediaType + '/' + id + API_KEY).then(res => res.json()).then(data => {
      mostrarSerie(data);
    })
  }
}

function mostrarPeli(data) {
  detalle.innerHTML = ``;
  const elemento = document.createElement('div');
  elemento.classList.add('contenido');
  elemento.innerHTML = `    
    <div class="cartel">
        <img src="${imagenTarjeta(API_IMG, data.poster_path)}" alt="${data.title}">
    </div>
    <div class="titulo"><h2>${data.title}</h2></div>
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

function mostrarSerie(data) {
  detalle.innerHTML = ``;

  const elemento = document.createElement('div');
  elemento.classList.add('contenido');
  elemento.innerHTML = `    
    <div class="cartel">
        <img src="${imagenTarjeta(API_IMG, data.poster_path)}" alt="${data.name}">
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
  return horas + "h" + " " + minutos + "m"
}

fetch(API_URL + mediaType + '/' + id + '/credits' + API_KEY).then(res => res.json()).then(dataCast => {
  mostrarReparto(dataCast.cast);
})

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

fetch(API_URL + mediaType + '/' + id + '/videos' + API_KEY).then(res => res.json()).then(dataTrailer => {
  let trailerKey = dataTrailer.results.find(dataTrailer => dataTrailer.type === 'Trailer')
  let divTrailer = document.createElement('div');
  divTrailer.classList.add('trailer');
  divTrailer.innerHTML = `
  <div><h3 class="detalle-h3">Trailer</h3></div>
  <div id="player"><iframe width="720" height="405" src="https://www.youtube.com/embed/${trailerKey.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  `
  trailer.appendChild(divTrailer);
})

fetch(API_URL + mediaType + '/' + id + '/similar' + API_KEY + '&page=1').then(res => res.json()).then(data => {
  document.getElementById('elemento-similar').innerHTML = `${tipoElemento(mediaType)}`
  relacionados.innerHTML = ``
  data.results.forEach(elemento => {
    let { id, name, backdrop_path, title } = elemento;
    let listaElemento = document.createElement('div');
    listaElemento.classList.add('similar-tarjeta');
    listaElemento.innerHTML = `
    <a href="detalle.html?type=${media(title, name)}&id=${id}"> <div class="similar-backdrop"><img src="${imagenTarjeta(API_IMG_BACK, backdrop_path)}" alt="${tipoTitulo(title, name)}"></div> </a>
    <a href="detalle.html?type=${media(title, name)}&id=${id}"> <div class="similar-titulo"><p class="similar-p">${tipoTitulo(title, name)}</p></div> </a>
    `
    relacionados.appendChild(listaElemento);
  })
})

function tipoElemento(mediaType) {
  if (mediaType === 'movie') {
    return 'Peliculas similares'
  } else {
    return 'Series similares'
  }
}

function tipoTitulo(title, name) {
  if (title) {
    return title
  } else {
    return name
  }
}

function media(title, name) {
  if (title) {
    return 'movie'
  } else {
    return 'tv'
  }
}

function imagenTarjeta(img, poster_path) {
  let desconocido = "img/tarjeta.png";
  if (poster_path === null || !poster_path) {
    return desconocido
  } else {
    return img + poster_path
  }
}