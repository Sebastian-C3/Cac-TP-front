const formulario = document.getElementById('formulario-contacto');
const inputs = document.querySelectorAll('#formulario-contacto input');
const msj = document.getElementById('mensaje')

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{8,12}$/
}

const campos = {
    nombre: false,
    correo: false,
    telefono: false
}

function validarFormulario(e) {
    switch (e.target.name) {
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case 'telefono':
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
    }
}

function validarCampo(expresion, input, campo) {
    if (expresion.test(input.value)) {
        document.querySelector(`#grupo-${campo} .formulario-input`).classList.remove('input-incorrecto');
        document.querySelector(`#grupo-${campo} .formulario-input`).classList.add('input-correcto');
        document.querySelector(`#grupo-${campo} .formulario-validacion-estado`).classList.remove('estado-incorrecto', 'fa-circle-xmark');
        document.querySelector(`#grupo-${campo} .formulario-validacion-estado`).classList.add('estado-correcto', 'fa-circle-check');
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.remove('formulario-input-error-activo');
        campos[campo] = true;
    } else {
        document.querySelector(`#grupo-${campo} .formulario-input`).classList.add('input-incorrecto');
        document.querySelector(`#grupo-${campo} .formulario-input`).classList.remove('input-correcto');
        document.querySelector(`#grupo-${campo} .formulario-validacion-estado`).classList.add('estado-incorrecto', 'fa-circle-xmark');
        document.querySelector(`#grupo-${campo} .formulario-validacion-estado`).classList.remove('estado-correcto', 'fa-circle-check');
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.add('formulario-input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
    if (campos.nombre && campos.correo && campos.telefono && validarMensaje(msj)) {
        event.preventDefault()
        const formData = new FormData(this)
        const respuesta = await fetch(this.action, {
            method: this.method,
            body: formData,
            headers: {
                'Accept': 'aplication/json'
            }
        })
        if (respuesta.ok) {
            this.reset()
            document.getElementById('formulario-mensaje').classList.remove('formulario-mensaje-activo')
            document.getElementById('formulario-mensaje-exito').classList.add('formulario-mensaje-exito-activo');
            limpiarCampos();
            setTimeout(() => {
                document.getElementById('formulario-mensaje-exito').classList.remove('formulario-mensaje-exito-activo')
            }, 5000);
        }
    } else {
        event.preventDefault();
        document.getElementById('formulario-mensaje').classList.add('formulario-mensaje-activo')
    }
}

formulario.addEventListener('reset', () => {
    limpiarCampos();
})

function limpiarCampos() {
    document.querySelectorAll('.formulario-input').forEach((e) => {
        e.classList.remove('input-incorrecto')
        e.classList.remove('input-correcto')
    })
    document.querySelectorAll('.formulario-validacion-estado').forEach((e) => {
        e.classList.remove('estado-correcto')
        e.classList.remove('estado-incorrecto')
    })
    document.querySelectorAll('.formulario-input-error').forEach((e) => {
        e.classList.remove('formulario-input-error-activo')
    })
    document.getElementById('formulario-mensaje').classList.remove('formulario-mensaje-activo')
}

function validarMensaje(valor) {
    if (valor.value.trim() === "") {
        document.querySelector('#grupo-mensaje .formulario-input-error').classList.add('formulario-input-error-activo');
        document.getElementById('mensaje').classList.add('input-incorrecto')
        return false
    } else {
        document.querySelector('#grupo-mensaje .formulario-input-error').classList.remove('formulario-input-error-activo');
        document.getElementById('mensaje').classList.remove('input-incorrecto')
        return true
    }
}