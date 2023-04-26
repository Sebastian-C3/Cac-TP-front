///////////header///////////

document.getElementById("header").innerHTML = `
<a href="index.html"><h1 class="h1">Pelis para todos</h1></a>

    <button class="button">
          <i class="fa-solid fa-bars fa-xl" id="svg"></i>      
    </button>

    <nav class="nav">
        <ul class="ul">
            <li class="li"><a href="index.html" class="a">Inicio</a></li>
            <li class="li"><a href="#series" class="a">Series</a></li>
            <li class="li"><a href="#peliculas" class="a">Peliculas</a></li>
            <li class="li"><a href="" class="a">Buscar</a></li>
            <li class="li"><a href="" class="a">Contacto</a></li>
        </ul>
    </nav>
`;

/*----------Menu----------*/

const button = document.querySelector('.button')
const nav    = document.querySelector('.nav')

button.addEventListener('click',()=>{
  nav.classList.toggle('activo')
})


///////////footer///////////

document.getElementById("footer").innerHTML = `
<p>Pelis para todos</p>

<p>Derechos&reservados</p>
    
`;