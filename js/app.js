/*----------header----------*/

document.getElementById("header").innerHTML = `
    <div class="logo">
    <a href="index.html"><h1 class="h1">Pelis para todos</h1></a>
    <a href="index.html"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x=".5" y=".5" rx="1"/><path d="M5.49 10.56V6.73A.36.36 0 0 1 6 6.42l3.32 1.91a.37.37 0 0 1 0 .63L6 10.88a.37.37 0 0 1-.51-.32ZM.5 4h13M4 4L5.5.5m3 3.5L10 .5"/></g></svg></a>
    </div>

    <button class="button">
          <i class="fa-solid fa-bars fa-xl" id="svg"></i>      
    </button>

    <nav class="nav">
        <ul class="ul">
            <li class="li"><a href="index.html" class="a">Inicio</a></li>
            <li class="li"><a href="https://pelisparatodos.netlify.app/index.html#series" class="a">Series</a></li>
            <li class="li"><a href="https://pelisparatodos.netlify.app/index.html#peliculas" class="a">Peliculas</a></li>
            <li class="li"><a href="buscador.html" class="a">Buscador</a></li>
            <li class="li"><a href="contacto.html" class="a">Contacto</a></li>
        </ul>
    </nav>
`;

/*----------Menu----------*/

const button = document.querySelector('.button')
const nav    = document.querySelector('.nav')
const main   = document.querySelector('#main')
const footer   = document.querySelector('#footer')

button.addEventListener('click',()=>{
  nav.classList.toggle('activo')
})

nav.addEventListener('click', e =>{
    if(e.target.id != nav){
        nav.classList.remove('activo')
    }
})

main.addEventListener('click', e=>{
    if(e.target.id != main){
        nav.classList.remove('activo')
    }
})

footer.addEventListener('click', e=>{
    if(e.target.id != footer){
        nav.classList.remove('activo')
    }
})

/*----------footer----------*/

document.getElementById("footer").innerHTML = `
<div class="footer-conteiner">
            <div class="footer-top">
                <div class="footer-conteiner-lista-secciones">
                    <h3 class="footer-titulo">Secciones</h3>
                    <ul class="footer-lista">
                        <li class="footer-lista-item">
                            <a href="index.html" class="footer-lista-link">Inicio</a>
                        </li>
                        <li class="footer-lista-item">
                            <a href="index.html#series" class="footer-lista-link">Series</a>
                        </li>
                        <li class="footer-lista-item">
                            <a href="index.html#peliculas" class="footer-lista-link">Peliculas</a>
                        </li>
                        <li class="footer-lista-item">
                            <a href="buscador.html" class="footer-lista-link">Buscador</a>
                        </li>
                        <li class="footer-lista-item">
                            <a href="contacto.html" class="footer-lista-link">Contacto</a>
                        </li>
                    </ul>
                </div>
                <div class="footer-conteiner-lista-redes">
                    <h3 class="footer-titulo">Encontranos en</h3>
                    <ul class="footer-lista">
                        <li class="footer-lista-item">
                            <a href="https://www.instagram.com" class="footer-lista-link" target="_blank"><i class="fa-brands fa-instagram fa-xl"></i> Instagram</a>
                        </li>
                        <li class="footer-lista-item">
                            <a href="https://twitter.com/?lang=es" class="footer-lista-link" target="_blank"><i class="fa-brands fa-twitter fa-xl"></i> Twitter</a>
                        </li>
                        <li class="footer-lista-item">
                            <a href="https://es-la.facebook.com/" class="footer-lista-link" target="_blank"><i class="fa-brands fa-facebook fa-xl"></i> Facebook</a>
                        </li>
                        <li class="footer-lista-item">
                            <a href="https://www.youtube.com/" class="footer-lista-link" target="_blank"><i class="fa-brands fa-youtube fa-xl"></i> Youtube</a>
                        </li>
                        <li class="footer-lista-item">
                            <a href="mailto:" class="footer-lista-link" target="_blank"><i class="fa-solid fa-envelope fa-xl"></i> Mail</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr class="footer-divider" />
            <div class="footer-bottom">
                
                <div class="footer-copyright">
                    <p>&copy; Copyright 2023 Equipo 13 Codo a Codo. Todos los derechos reservados.</p>
                </div>
                
                <div class="footer-tmdb">
                    <p>Powered by <a href="https://www.themoviedb.org/" target="_blank"><img class="img-tmdb" src="img/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB"></a></p>
                </div>
            </div>
        </div>
`;