/******************************************
**JAVASCRIPT PARA PÁGINA THE COFFEE HOUSE** 
******************************************/


// Función para mostrar el pop-up página productos

function mostrarPopup(mensaje) {
    // Crear elementos del pop-up
    const popup = document.createElement('div');
    popup.className = 'popup';

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    const texto = document.createElement('p');
    texto.textContent = mensaje;

    const botonCerrar = document.createElement('button');
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.className = 'popup-cerrar';
    botonCerrar.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    popupContent.appendChild(texto);
    popupContent.appendChild(botonCerrar);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}



/* CÓDIGO JS PARA LA PÁGINA DEL CARRITO */

document.addEventListener('DOMContentLoaded', mostrarCarrito);

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('lista-carrito');
    let totalCompra = 0;
    let totalArticulos = 0;

    listaCarrito.innerHTML = '';

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        const precioTotalProducto = producto.precio * producto.cantidad;
        totalCompra += precioTotalProducto;
        totalArticulos += producto.cantidad;

        li.textContent = `${producto.nombre} - ${producto.precio} € x ${producto.cantidad} - Total: ${precioTotalProducto.toFixed(2)} €`;

        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'Eliminar producto';
        botonBorrar.addEventListener('click', () => borrarProducto(index));
        li.appendChild(botonBorrar);
        listaCarrito.appendChild(li);
    });

    const totalElement = document.createElement('li');
    totalElement.textContent = `Total de artículos: ${totalArticulos}`;
    listaCarrito.appendChild(totalElement);

    const totalPagarElement = document.createElement('li');
    totalPagarElement.textContent = `Total a pagar: ${totalCompra.toFixed(2)} €`;
    listaCarrito.appendChild(totalPagarElement);
};

function borrarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Reducir la cantidad del producto en 1
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        // Si solo queda una unidad, eliminar el producto
        carrito.splice(index, 1);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
};

function completarCompra() {
    mostrarPopup('¡Compra completada con éxito! Gracias por su compra.');
    localStorage.removeItem('carrito'); // Vaciar carrito
    mostrarCarrito(); // Actualizar lista del carrito (se mostrará vacía)
};



/* CÓDIGO JS PARA LA PÁGINA DE PRODUCTOS */

function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Buscar si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        // Si ya está en el carrito, incrementar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no está en el carrito, agregarlo con cantidad 1
        carrito.push({nombre, precio, cantidad: 1});
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarPopup(`El producto "${nombre}" se agregó al carrito.`);
};



/* CÓDIGO JS PARA LA PÁGINA DE CONTACTO (FORMULARIO) */

//variables y constantes:
const maxCaracteres = 50;

// campos del formulario:
const formulario = document.getElementById('form-contacto');
const campoNombre = document.getElementById('dato-usuario');
const campoCorreo = document.getElementById('dato_email');
const campoTelefono = document.getElementById('dato_telefono');
const areaTematica = document.getElementById('area_tematica');
const campoComentarios = document.getElementById('dato_consulta');
const mensajeCaracteres = document.querySelector('.mensaje-caracteres');
const campoClausulas = document.getElementById('dato_acepto_clausulas');

const clausulas = document.getElementById('clausulas');

/* infos de error */
const errorNombre = document.getElementById('error-nombre');
const errorEmail = document.getElementById('error-email');
const errorTelefono = document.getElementById('error-telefono');
const errorTematica = document.getElementById('error-tematica');
const errorConsulta = document.getElementById('error-consulta');
const errorClausulas = document.getElementById('error-clausulas');

//todos los mensajes de error:
const mensajesError = document.querySelectorAll('.mensajes-error');

// expresiones regulares para algunos campos:
const patronNombre = /^[\wñáéíóú]{2,30}$/i;
const patronCorreo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const patronTelefono = /^(?:[+]?(?:[0-9]{1,5}|\\x28[0-9]{1,5}\\x29)[ ]?)?[0-9]{2}(?:[0-9][ ]?){6}[0-9]$/;

/// contar caracteres escritos cada vez que se detecta evento input
function contarCaracteres() {
    var numeroCaracteres = campoComentarios.value.length;

    mensajeCaracteres.innerHTML = `Caracteres disponibles ${maxCaracteres - numeroCaracteres}`;

    if (numeroCaracteres > maxCaracteres) {
        mensajeCaracteres.classList.add('exceso-caracteres');
    } else {
        mensajeCaracteres.classList.remove('exceso-caracteres');
    }
}

campoComentarios.addEventListener('input', function () {
    contarCaracteres();
});

contarCaracteres();

// evento para llamar a la validación: 
formulario.addEventListener('submit', (evento) => {

    //evitamos envío de formulario
    evento.preventDefault();

    //vaciar mensajes de error:
    mensajesError.forEach((elemento) => { elemento.innerText = "" })

    // obtenemos valor actual de los campos:
    var valorNombre = campoNombre.value;
    var valorCorreo = campoCorreo.value;
    var valorTelefono = campoTelefono.value;

    var valorComentarios = campoComentarios.value;


    //chequeamos los campos
    if (!patronNombre.test(valorNombre)) {
        errorNombre.innerText = 'Escriba su nombre empleando entre 2 y 30 caracteres';
        campoNombre.focus();
        return;
    }

    if (!patronCorreo.test(valorCorreo)) {
        errorEmail.innerText = 'Debe insertar un correo electrónico válido';
        campoCorreo.focus();
        return;
    }

    if (!patronTelefono.test(valorTelefono)) {
        errorTelefono.innerText = 'Debe insertar un teléfono válido';
        campoTelefono.focus();
        return;
    }

    if (areaTematica.selectedIndex == 0) {
        errorTematica.innerText = 'Elija un área temática';
        areaTematica.focus();
        return;
    }

    if (valorComentarios.length == 0 ||
        /^\s+$/.test(valorComentarios)) {
        errorConsulta.innerText = 'Los comentarios son obligatorios';
        campoComentarios.focus();
        return;
    }

    if (campoComentarios.value.length > maxCaracteres) {
        errorConsulta.innerText = 'El comentario supera el máximo de caracteres';
        campoComentarios.focus();
        return;
    }

    if (campoClausulas.checked == false) {
        errorClausulas.innerText = 'Debe aceptar las cláusulas';
        clausulas.focus();
        return;
    }

    formulario.submit();
});
