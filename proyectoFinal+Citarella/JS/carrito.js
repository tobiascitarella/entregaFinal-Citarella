import { obtenerProductos} from './main.js';
let carrito = [];

function agregarAlCarrito(nombre, precio){
    const productoEnCarrito = carrito.find(producto=> producto.nombre === nombre);

    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else{
        carrito.push({nombre, precio, cantidad: 1 });
    }

    Swal.fire({
        icon: 'success',
        text: 'Producto agregado',
        showConfirmButton: false,
        timer: 1000 
    });

    guardarCarritoEnLocalStorage();
    actualizarContenidoCarrito();
}

function guardarCarritoEnLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerCarritoDesdeLocalStorage(){
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function actualizarContenidoCarrito(){
    const carritoBody = document.getElementById('carrito-body');
    const totalElementos = document.getElementById('total-pagar');
    carritoBody.innerHTML= '';

    let totalPagar = 0;
    
    carrito = obtenerCarritoDesdeLocalStorage(); 

    carrito.forEach(producto =>{
        const filaProducto = document.createElement('tr');
        filaProducto.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
        <td>
            <div class="d-flex">
                <button class="btn btn-sm btn-dark btn-agregar" onclick="incrementarCantidad('${producto.nombre}')">
                    <i class="fas fa-plus"></i>
                </button>
                <div class="ms-2">
                    <button class="btn btn-sm btn-dark btn-quitar" onclick="decrementarCantidad('${producto.nombre}')">
                        <i class="fas fa-minus"></i> 
                    </button>
                </div>
                <div class="ms-2">
                    <button class="btn btn-sm btn-danger btn-eliminar" onclick="eliminarProducto('${producto.nombre}')">
                        <i class="fas fa-times"></i> 
                    </button>
                </div>
            </div>
        </td>
        `;

        carritoBody.appendChild(filaProducto);

        totalPagar += producto.precio * producto.cantidad;
    });

    totalElementos.textContent = `$${totalPagar.toFixed(2)}`;

}


function incrementarCantidad(nombreProducto) {
    const productoEnCarrito = carrito.find(producto => producto.nombre === nombreProducto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        guardarCarritoEnLocalStorage();
        actualizarContenidoCarrito();
    }
}


function decrementarCantidad(nombreProducto) {
    const productoEnCarrito = carrito.find(producto => producto.nombre === nombreProducto);
    if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
        guardarCarritoEnLocalStorage();
        actualizarContenidoCarrito();
    }
}

function eliminarProducto(nombreProducto) {
    carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
    guardarCarritoEnLocalStorage();
    actualizarContenidoCarrito();
}

document.querySelector('#miModal .modal-footer .btn-primary').addEventListener('click', realizarCompra);

function realizarCompra() {
    if (carrito.length === 0) {
        
        Swal.fire({
            icon: 'error',
            title: 'Carrito Vacío',
            text: 'No puedes realizar la compra porque tu carrito está vacío.',
            confirmButtonText: 'Entendido'
        });
    } else {
        
        Swal.fire({
            icon: 'success',
            title: '¡Compra realizada!',
            text: '¡Gracias por su compra!',
            confirmButtonText: 'Aceptar'
        });

        carrito = [];
        guardarCarritoEnLocalStorage();
        actualizarContenidoCarrito();
    }
}

carrito = obtenerCarritoDesdeLocalStorage();

obtenerProductos();
actualizarContenidoCarrito();