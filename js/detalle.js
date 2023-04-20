const detalle = document.getElementById('contenido-principal');
const iD = document.getElementById('movie-id');


detalle.innerHTML = ``;

const elemento = document.createElement('div');
elemento.classList.add('contenido');
elemento.innerHTML = `    
    <div class="cartel">
        <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gh2bmprLtUQ8oXCSluzfqaicyrm.jpg" alt="John Wick 4">
    </div>
    <div class="titulo"><h2>John Wick 4</h2></div>
    <div class="genero">
        <div class="generos">Accion, Suspenso, Crimen</div>
        <div class="duracion">2h 50m</div>
    </div>
    
    <div class="descripcion">
        <h3 class="h3">Sinopsis</h3>
        <p class="p">John Wick descubre un camino para derrotar a la Alta Mesa. Pero para poder ganar su libertad, Wick deberá enfrentarse a un nuevo rival con poderosas alianzas en todo el mundo, capaz de convertir a viejos amigos en enemigos.</p>
    </div>
    `;
detalle.appendChild(elemento);

