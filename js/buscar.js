const form = document.getElementById('form');
const buscador = document.getElementById('buscador');
const resultados = document.getElementById('resultados');
const peliculas = document.getElementById('peliculas')
const series = document.getElementById('series')

const API_CON = ' https://api.themoviedb.org/3/search/';
const API_KEY = '?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX&query=';
const API_MOV = 'movie';
const API_TV = 'tv';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let terminoBusc = buscador.value;

    console.log(terminoBusc);

    if (terminoBusc) {
        if(peliculas.checked){
            console.log('Peliculas')
            fetch(API_CON + API_MOV + API_KEY + terminoBusc).then(res => res.json()).then(data => {
                // console.log(data)
                mostrarResultados(data.results);
            })

        }else if(series.checked){
            console.log('Series')
            fetch(API_CON + API_TV + API_KEY + terminoBusc).then(res => res.json()).then(data => {
                // console.log(data)
                mostrarResultados(data.results);
            })
        }  
    }
})


function mostrarResultados(data) {
    resultados.innerHTML = ``;
    //const resultado = data;
    console.log(data)
    console.log(data.page)
    console.log(data.total_pages)

     data.forEach(element => {
         let { id, title, name, media_type, poster_path, overview } = element
         let elemntoBusc = document.createElement('div');
         elemntoBusc.classList.add('resultado-tarjeta');
         elemntoBusc.innerHTML = `
                 <div class="resultado-img">
                     <a href="detalle.html?type=${tipoMedia(title,name)}&id=${id}"><img src="https://image.tmdb.org/t/p/w94_and_h141_bestv2${poster_path}" alt="${tipoTitulo(title,name)}" ></a>
                 </div>
                 <div>
                     <div class="resultado-titulo">
                         <a href="detalle.html?type=${tipoMedia(title,name)}&id=${id}">${tipoTitulo(title,name)}</a>
                     </div>
                     <div class="resultado-descrip">
                         <p>${overview}</p>
                     </div>
                 </div> 
         `
         resultados.appendChild(elemntoBusc);
     });
}

function tipoTitulo(title, name) {
    if (title) {
        return title
    } else {
        return name
    }
}

function tipoMedia(title,name){
    if (title){
        return 'movie'
    }else{
        return 'tv'
    }
}