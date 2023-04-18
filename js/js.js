const button = document.querySelector('.button')
const nav    = document.querySelector('.nav')

button.addEventListener('click',()=>{
  nav.classList.toggle('activo')
})



const API_KEY       = '099cdb38bba623d5a52962430eff4a2e';
const API_URL       = 'https://api.themoviedb.org/3/';
const API_PELI_POP  = API_URL + 'movie/now_playing?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-ES&page=1&region=ar';
const API_TV_POP    = API_URL + 'tv/top_rated?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-ES&page=1'
const IMG_LISTA     = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';
const URL_IMG       = 'https://www.themoviedb.org/movie/';

const VIDEOS        = 'https://api.themoviedb.org/3/movie/603692/videos?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-ES'

const DETALLE_MOVIE = 'https://api.themoviedb.org/3/movie/603692?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-ES'

const lista = document.getElementById('carousel-container');
const listaTv = document.getElementById('carousel-container2');

getPeliPop(API_PELI_POP);
getTvPop(API_TV_POP);
getVideos(VIDEOS);

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
      const {title, poster_path, id,overview} = element;
      const listaElement = document.createElement('div');
      listaElement.classList.add('carousel');
      listaElement.innerHTML = `<a href="${URL_IMG+id}"><img class="poster" src=${IMG_LISTA+poster_path} alt=${title}></a>
                                <a href="${URL_IMG+id}"><p class="titulo">${title}</p></a>
                                <div class="overview">"${overview}"</div>
                                `
      lista.appendChild(listaElement);
  });
}

function mostrarListaTv(data){
  listaTv.innerHTML = ``;
  data.forEach(element => {
    const {name, poster_path, id, overview} = element;
    const listaTvElement = document.createElement('div');
    listaTvElement.classList.add('carousel');
    listaTvElement.innerHTML = `
                                <a href="${URL_IMG+id}"><img class="poster" src=${IMG_LISTA+poster_path} alt=${name}></a>
                                <a href="${URL_IMG+id}"><p class="titulo">${name}</p></a>
                                <div class="overview">"${overview}"</div>
                               `
    listaTv.appendChild(listaTvElement);                               
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