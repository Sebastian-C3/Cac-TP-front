const API_KEY = '?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX';
const API_URL = 'https://api.themoviedb.org/3/';
const API_PELI_POP = API_URL + 'movie/now_playing' + API_KEY + '&page=1&region=ar';
const API_TV_POP = API_URL + 'tv/top_rated' + API_KEY;
const IMG_LISTA = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
const API_TV_TREND = API_URL + 'trending/tv/day' + API_KEY;
const API_PELI_EST = API_URL + 'movie/upcoming' + API_KEY;
const SECCION_PEL = document.querySelector('.peliculas');
const SECCION_TV = document.querySelector('.series');

const TITULOS = [
  'Películas - Novedades en cartelera',
  'Películas - Tendencias',
  'Series - Mejor puntuado',
  'Series - Tendencias'
]
const getListas = async() => {
  try {
      let respPop = await fetch(API_PELI_POP);
      let resPeliPop = await respPop.json();
     
      let respEst = await fetch(API_PELI_EST);
      let resPeliEst = await respEst.json();

      let resultadosPel = [resPeliPop.results, resPeliEst.results];
      
      mostrarLista2(resultadosPel,TITULOS)

      let restPop = await fetch(API_TV_POP);
      let resTvPop = await restPop.json();
     
      let restEst = await fetch(API_TV_TREND);
      let resTvEst = await restEst.json();
     
      let resultadosTV = [resTvPop.results, resTvEst.results];

      mostrarLista3(resultadosTV, TITULOS)
  } catch (error) {
      console.warn(error);
  }
}

getListas();

function mostrarLista2(resultados, titulos){
  for (let index = 0; index < resultados.length; index++) {
    mostrarLista(resultados[index],titulos[index],index+1,SECCION_PEL)   
  }
}

function mostrarLista3(resultadosTv, titulosTV){
  for (let index = 0; index < resultadosTv.length; index++) {
    mostrarLista(resultadosTv[index],titulosTV[index+2],index+3,SECCION_TV)
  }
}

function mostrarLista(resultados, titulo, n, tipoSec){
  let conteinerDiv = document.createElement('div');
  conteinerDiv.classList.add('subtitulo')
  conteinerDiv.setAttribute('id', `subtitulo-${n}`)
  tipoSec.append(conteinerDiv);
  document.querySelector(`#subtitulo-${n}`).innerHTML = `<h3>${titulo}</h3>`;
  let carruselDiv = document.createElement('div');
  carruselDiv.classList.add ('carrusel-conteiner');
  carruselDiv.innerHTML = ``;
  tipoSec.append(carruselDiv);
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