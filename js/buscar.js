const form = document.getElementById('form-buscador');
const buscador = document.getElementById('buscador');
const resultados = document.getElementById('resultados');
const peliculas = document.getElementById('peliculas')
const series = document.getElementById('series')
const API_CON = ' https://api.themoviedb.org/3/search/';
const API_KEY = '?api_key=099cdb38bba623d5a52962430eff4a2e&language=es-MX&query=';
const IMG_BUSC = 'https://image.tmdb.org/t/p/w94_and_h141_bestv2';
const API_MOV = 'movie';
const API_TV = 'tv';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let terminoBusc = buscador.value;

    if (terminoBusc) {
        if (peliculas.checked) {
            const urlPel = API_CON + API_MOV + API_KEY + terminoBusc
            fetch(urlPel).then(res => res.json()).then(data => {
                mostrarBusqueda(data, urlPel);
            })
        } else if (series.checked) {
            const urlTV = API_CON + API_TV + API_KEY + terminoBusc
            fetch(urlTV).then(res => res.json()).then(data => {
                mostrarBusqueda(data, urlTV);
            })
        }
    }
});

function mostrarBusqueda(data, url) {
    let pagAct = data.page
    let cantPag = data.total_pages;
    resultados.innerHTML = ``;

    for (let index = pagAct; index <= cantPag; index++) {
        let divBuscador = document.createElement('div');
        divBuscador.setAttribute('id', 'resultado-tarjetas')
        resultados.appendChild(divBuscador)
        fetch(url + '&page=' + index).then(res => res.json()).then(data => {
            data.results.forEach(element => {
                let { id, title, name, media_type, poster_path, overview } = element
                let elemntoBusc = document.createElement('div');
                elemntoBusc.classList.add('resultado-tarjeta');
                elemntoBusc.innerHTML = `
                    <div class="resultado-img">
                        <a href="detalle.html?type=${tipoMedia(title, name)}&id=${id}"><img src="${imagenTarjeta(IMG_BUSC, poster_path)}" alt="${tipoTitulo(title, name)}" ></a>
                    </div>
                    <div>
                        <div class="resultado-titulo">
                            <a href="detalle.html?type=${tipoMedia(title, name)}&id=${id}">${tipoTitulo(title, name)}</a>
                        </div>
                        <div class="resultado-descrip">
                            <p>${overview}</p>
                        </div>
                    </div> 
                `
                divBuscador.appendChild(elemntoBusc);
            });
        })
    }
}

function tipoTitulo(title, name) {
    if (title) {
        return title
    } else {
        return name
    }
}

function tipoMedia(title, name) {
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