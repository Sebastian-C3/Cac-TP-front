 const detalle = document.getElementById('contenido-principal');
// const iD = document.getElementById('movie-id');
// var dataId = iD.getAttribute('data-id');

// console.log(dataId);




// detalle.innerHTML = ``;

// const elemento = document.createElement('div');
// elemento.classList.add('contenido');
// elemento.innerHTML = `    
    // <div class="cartel">
        // <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gh2bmprLtUQ8oXCSluzfqaicyrm.jpg" alt="John Wick 4">
    // </div>
    // <div class="titulo"><h2>John Wick 4</h2></div>
    // <div class="genero">
        // <div class="generos">Accion, Suspenso, Crimen</div>
        // <div class="duracion">2h 50m</div>
    // </div>
    
    // <div class="descripcion">
        // <h3 class="h3">Sinopsis</h3>
        // <p class="p">John Wick descubre un camino para derrotar a la Alta Mesa. Pero para poder ganar su libertad, Wick deberá enfrentarse a un nuevo rival con poderosas alianzas en todo el mundo, capaz de convertir a viejos amigos en enemigos.</p>
    // </div>
    // `;
// detalle.appendChild(elemento);




// obtén el parámetro "id" de la URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// realiza una solicitud a la API utilizando fetch


  fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX').then(res => res.json()).then(data =>{
    console.log(data);

    detalle.innerHTML = ``;

const elemento = document.createElement('div');
elemento.classList.add('contenido');
elemento.innerHTML = `    
    <div class="cartel">
        <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}" alt="${data.title}">
    </div>
    <div class="titulo"><h2>${data.title}</h2></div>
    <div class="genero">
        <div class="generos">Accion, Suspenso, Crimen</div>
        <div class="duracion">2h 50m</div>
    </div>
    
    <div class="descripcion">
        <h3 class="h3">Sinopsis</h3>
        <p class="p">${data.overview}</p>
    </div>
    `;
detalle.appendChild(elemento);

  })



// data.forEach(element => {
  // var {title, poster_path, id, overview,genres} = element;
  // var listaTvElement = document.createElement('div');
  // listaTvElement.classList.add('contenido');
  // listaTvElement.innerHTML = `
                              // <a href="${URL_IMG2+id}"><img class="poster" src=${IMG_LISTA+poster_path} alt=${name}></a>
                              // <a href="${URL_IMG2+id}"><p class="titulo">${name}</p></a>
                              // <div class="overview">"${overview}"</div>
                            //  `
  // listaTv.appendChild(listaTvElement);
  
// });


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