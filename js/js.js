const API_KEY = '?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX';
const API_URL = 'https://api.themoviedb.org/3/';
const API_PELI_POP = API_URL + 'movie/now_playing' + API_KEY + '&page=1&region=ar';
const API_TV_POP = API_URL + 'tv/top_rated' + API_KEY;
const IMG_LISTA = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
const API_TV_TREND = API_URL + 'trending/tv/day' + API_KEY;
const API_PELI_EST = API_URL + 'trending/movie/week' + API_KEY //'movie/upcoming?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX&page=1&region=AR'
//'trending/movie/week?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX'

const lista = document.getElementById('carrusel-container');
const lista2 = document.getElementById('carrusel-container4');
const listaTv = document.getElementById('carrusel-container2');
const listaTv2 = document.getElementById('carrusel-container3');

getPeliPop(API_PELI_POP);//novedades en cartelera
getTvPop(API_TV_POP);//mejor puntuado
getTvTrend(API_TV_TREND);//tendencias
getPeliEst(API_PELI_EST);//tendencias

function getPeliEst(url) {
  fetch(url).then(res => res.json()).then(data => {
    //console.log(data);
    mostrarListaEst(data.results);
  })
}

function getTvTrend(url) {
  fetch(url).then(res => res.json()).then(data => {
    //console.log(data);
    mostrarListaTvTrend(data.results);
  })
}


function getPeliPop(url) {

  fetch(url).then(res => res.json()).then(data => {
    //console.log(data);

    mostrarLista(data.results);
  })

}

function getTvPop(url2) {
  fetch(url2).then(res => res.json()).then(data2 => {
    //console.log(data2);

    mostrarListaTv(data2.results);
  })
}

function mostrarLista(data) {
  lista.innerHTML = ``;
  data.forEach(element => {
    let { title, poster_path, id, overview, media_type } = element;
    let listaElement = document.createElement('div');
    listaElement.classList.add('carrusel');
    listaElement.setAttribute('id', 'carrusel')
    listaElement.innerHTML = `<a href="detalle.html?type=movie&id=${id}"><img class="poster" src=${IMG_LISTA + poster_path} alt=${title}></a>
                              <a href="detalle.html?type=movie&id=${id}"><p class="carrusel-titulo">${title}</p></a>
                              <a href="detalle.html?type=movie&id=${id}"><div class="overview"><p>"${overview}"</p></div></a>
                              `
    lista.appendChild(listaElement);
  });
}

function mostrarListaEst(data) {
  lista2.innerHTML = ``;
  data.forEach(element => {
    let { title, poster_path, id, overview, media_type } = element;
    let listaElementEst = document.createElement('div');
    listaElementEst.classList.add('carrusel');
    listaElementEst.innerHTML = `<a href="detalle.html?type=${media_type}&id=${id}"><img class="poster" src=${IMG_LISTA + poster_path} alt=${title}></a>
                                 <a href="detalle.html?type=movie&id=${id}"><p class="carrusel-titulo">${title}</p></a>
                                 <a href="detalle.html?type=movie&id=${id}"><div class="overview"><p>"${overview}"</p></div></a>
                              `
    lista2.appendChild(listaElementEst);
  });
}



function mostrarListaTv(data) {
  listaTv.innerHTML = ``;
  data.forEach(element => {
    let { name, poster_path, id, overview, media_type } = element;
    let listaTvElement = document.createElement('div');
    listaTvElement.classList.add('carrusel');
    listaTvElement.innerHTML = `
                                <a href="detalle.html?type=tv&id=${id}"><img class="poster" src=${IMG_LISTA + poster_path} alt=${name}></a>
                                <a href="detalle.html?type=tv&id=${id}"><p class="carrusel-titulo">${name}</p></a>
                                <a href="detalle.html?type=movie&id=${id}"><div class="overview"><p>"${overview}"</p></div></a>
                               `
    listaTv.appendChild(listaTvElement);

  });
}

function mostrarListaTvTrend(data) {
  listaTv2.innerHTML = ``;
  data.forEach(element => {
    let { name, poster_path, id, overview, media_type } = element;
    let listaTVElTrend = document.createElement('div');
    listaTVElTrend.classList.add('carrusel');
    listaTVElTrend.innerHTML = `
                                <a href="detalle.html?type=${media_type}&id=${id}"><img class="poster" src=${IMG_LISTA + poster_path} alt=${name}></a>
                                <a href="detalle.html?type=tv&id=${id}"><p class="carrusel-titulo">${name}</p></a>
                                <a href="detalle.html?type=movie&id=${id}"><div class="overview"><p>"${overview}"</p></div></a>
                               `
    listaTv2.appendChild(listaTVElTrend);
  })
}