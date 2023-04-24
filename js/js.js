/*----------Menu----------*/

const button = document.querySelector('.button')
const nav    = document.querySelector('.nav')

button.addEventListener('click',()=>{
  nav.classList.toggle('activo')
})

const DETALLE2      ='detalle2.html'

const API_KEY       = '099cdb38bba623d5a52962430eff4a2e';
const API_URL       = 'https://api.themoviedb.org/3/';
const API_PELI_POP  = API_URL + 'movie/now_playing?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX&page=1&region=ar';
const API_TV_POP    = API_URL + 'tv/top_rated?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX&page=1'
const IMG_LISTA     = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';
const URL_IMG       = 'https://www.themoviedb.org/movie/';
const URL_IMG2       = 'https://www.themoviedb.org/tv/';

const VIDEOS        = 'https://api.themoviedb.org/3/movie/603692/videos?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX'

const DETALLE_MOVIE = 'https://api.themoviedb.org/3/movie/603692?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX'

const API_TV_TREND = API_URL + 'trending/tv/day?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX'

const API_PELI_EST = API_URL + 'trending/movie/week?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX' //'movie/upcoming?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX&page=1&region=AR'
//'trending/movie/week?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX'

const lista = document.getElementById('carousel-container');
const lista2 = document.getElementById('carousel-container4');
const listaTv = document.getElementById('carousel-container2');
const listaTv2 = document.getElementById('carousel-container3');

getPeliPop(API_PELI_POP);
getTvPop(API_TV_POP);
getVideos(VIDEOS);
getTvTrend(API_TV_TREND);
getPeliEst(API_PELI_EST);

function getPeliEst(url){
  fetch(url).then(res => res.json()).then(data => {
    console.log(data);
    mostrarListaEst(data.results);
  })
}

function getTvTrend(url){
  fetch(url).then(res => res.json()).then(data =>{
    console.log(data);
    mostrarListaTvTrend(data.results);
  })
}

function getVideos(url){
  fetch(url).then(res => res.json()).then(data =>{
    console.log(data);
  })
}

function getPeliPop (url){

  fetch(url).then(res => res.json()).then(data =>{
   // console.log(data);

   mostrarLista(data.results);
  })

}

function getTvPop(url2){
  fetch(url2).then(res => res.json()).then(data2 =>{
    //console.log(data2);

    mostrarListaTv(data2.results);
  })
}

function mostrarLista(data){
  lista.innerHTML = ``;
  data.forEach(element => {
    var {title, poster_path, id,overview} = element;
    var listaElement = document.createElement('div');
    listaElement.classList.add('carousel');
    listaElement.setAttribute('id' , 'carousel')
   // listaElement.id.add('carousel');
    listaElement.innerHTML = `<a data-media-type="movie"  href="detalle2.html?id=${id}" id="movie-id"><img class="poster" src=${IMG_LISTA+poster_path} alt=${title}></a>
                              <a data-media-type="movie"  href="${URL_IMG+id}"><p class="titulo">${title}</p></a>
                              <div class="overview">"${overview}"</div>
                              `
    lista.appendChild(listaElement);
  });
}

function mostrarListaEst(data){
  lista2.innerHTML = ``;
  data.forEach(element => {
    var {title, poster_path, id,overview} = element;
    var listaElementEst = document.createElement('div');
    listaElementEst.classList.add('carousel');
    listaElementEst.innerHTML = `<a href="${URL_IMG+id}"><img class="poster" src=${IMG_LISTA+poster_path} alt=${title}></a>
                              <a href="${URL_IMG+id}"><p class="titulo">${title}</p></a>
                              <div class="overview">"${overview}"</div>
                              `
    lista2.appendChild(listaElementEst);
  });
}



function mostrarListaTv(data){
  listaTv.innerHTML = ``;
  data.forEach(element => {
    var {name, poster_path, id, overview} = element;
    var listaTvElement = document.createElement('div');
    listaTvElement.classList.add('carousel');
    listaTvElement.innerHTML = `
                                <a href="${URL_IMG2+id}"><img class="poster" src=${IMG_LISTA+poster_path} alt=${name}></a>
                                <a href="${URL_IMG2+id}"><p class="titulo">${name}</p></a>
                                <div class="overview">"${overview}"</div>
                               `
    listaTv.appendChild(listaTvElement);
    
  });
}

function mostrarListaTvTrend(data){
  listaTv2.innerHTML = ``;
  data.forEach(element => {
    var {name, poster_path, id, overview} = element;
    var listaTVElTrend = document.createElement('div');
    listaTVElTrend.classList.add('carousel');
    listaTVElTrend.innerHTML = `
                                <a href="${URL_IMG2+id}"><img class="poster" src=${IMG_LISTA+poster_path} alt=${name}></a>
                                <a href="${URL_IMG2+id}"><p class="titulo">${name}</p></a>
                                <div class="overview">"${overview}"</div>
                               `
    listaTv2.appendChild(listaTVElTrend);
  })
}










//////yt

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'L0anWmmd8TI',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}