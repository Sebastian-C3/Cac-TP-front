const API_KEY = '?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX';
const API_URL = 'https://api.themoviedb.org/3/';
const API_PELI_POP = API_URL + 'movie/now_playing' + API_KEY + '&page=1&region=ar';
const API_TV_POP = API_URL + 'tv/top_rated' + API_KEY;
const IMG_LISTA = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
const API_TV_TREND = API_URL + 'trending/tv/day' + API_KEY;
const API_PELI_EST = API_URL + 'movie/upcoming' + API_KEY;
const seccion = document.querySelector('.section');

const TITULOS = {
  peli1 : 'Películas - Novedades en cartelera',
  peli2 : 'Películas - Tendencias',
  serie1: 'Series - Mejor puntuado',
  serie2: 'Series - Tendencias'
}

const getListas = async() => {
  try {
      const respPop = await fetch(API_PELI_POP);
      const resPeliPop = await respPop.json();
      mostrarLista(resPeliPop.results, TITULOS.peli1, 1)

      const respEst = await fetch(API_PELI_EST);
      const resPeliEst = await respEst.json();
      mostrarLista(resPeliEst.results, TITULOS.peli2, 2)

      const restPop = await fetch(API_TV_POP);
      const resTvPop = await restPop.json();
      mostrarLista(resTvPop.results, TITULOS.serie1, 3);

      const restEst = await fetch(API_TV_TREND);
      const resTvEst = await restEst.json();
      mostrarLista(resTvEst.results, TITULOS.serie2, 4);
  } catch (error) {
      console.warn(error);
  }
}

getListas()

function mostrarLista(resultados, titulo, n){
  let conteinerDiv = document.createElement('div');
  conteinerDiv.classList.add('subtitulo')
  conteinerDiv.setAttribute('id', `subtitulo-${n}`)
  seccion.appendChild(conteinerDiv);
  document.querySelector(`#subtitulo-${n}`).innerHTML = `<h3>${titulo}</h3>`;
  let carruselDiv = document.createElement('div');
  carruselDiv.classList.add ('carrusel-conteiner');
  carruselDiv.innerHTML = ``;
  seccion.appendChild(carruselDiv);
  resultados.forEach(element => {
  let { title, name, poster_path, id, overview} = element;
  let listaElementEst = document.createElement('div');
  listaElementEst.classList.add('carrusel');
  listaElementEst.innerHTML = `<a href="detalle.html?type=${tipoMedia(title)}&id=${id}"><img class="poster" src=${imagenTarjeta(IMG_LISTA, poster_path)} alt=${tipoTitulo(title, name)}></a>
                               <a href="detalle.html?type=${tipoMedia(title)}&id=${id}"><p class="carrusel-titulo">${tipoTitulo(title, name)}</p></a>
                               <a href="detalle.html?type=${tipoMedia(title)}&id=${id}"><div class="overview"><p>"${overview}"</p></div></a>
                              `
  carruselDiv.appendChild(listaElementEst);
  });
}

function tipoMedia(title) {
  if (title) {
    return 'movie'
  } else {
    return 'tv'
  }
};

function imagenTarjeta(img, poster_path){
  let desconocido = "img/tarjeta.png";
  if(!poster_path){
    return desconocido
  }else{
    return img+poster_path
  }
};

function tipoTitulo(title, name) {
  if (title) {
      return title
  } else {
      return name
  }
};

export {
  tipoMedia,
  imagenTarjeta,
  tipoTitulo,
  API_URL,
  API_KEY
};