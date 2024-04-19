import { agregarAlCarrito } from './carrito.js';
async function obtenerProductos(){
    try{
        const respuesta = await fetch('http://localhost:5500/JSON/productos.json');
        if(!respuesta.ok){
            throw new Error(`Error al obtener los productos. Codigo: ${respuesta.status}`)
        }

        const productos = await respuesta.json();
        console.log(productos);

        renderizarProductos(productos.productos);


    } catch (error){
        console.error(`Hubo un error: ${error.message}`); 
    }
}

function renderizarProductos(productos){
    const contenedorProductos = document.getElementById('productos-container');

    productos.forEach(producto=>{
        const divProducto = document.createElement('div');
        divProducto.className = 'col-md-4'; 

        divProducto.innerHTML =  `
        <div class="card border-dark mb-4">
            <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title mb-3">${producto.nombre}</h5>
            <div class="mb-3">
                <img src="${producto.imagen}" class="img-fluid" >
            </div>
            <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
            <p class="card-text">Categoria: ${producto.categoria}</p>
            <button class="btn btn-dark btn-agregar")" id="btn-agregar">Agregar al carrito</button>
            </div>
        </div> 
        `;
        contenedorProductos.appendChild(divProducto);

        divProducto.querySelector('.btn-agregar').addEventListener('click', function() {
            agregarAlCarrito(producto.nombre, producto.precio);
        });
    });
}



document.getElementById('buscador').addEventListener('input', filtrarProductos);

function filtrarProductos(){
    const filtro = document.getElementById('buscador').value.toLowerCase();
    const productos = document.getElementById('productos-container').getElementsByClassName('col-md-4'); /* card */

    Array.from(productos).forEach(producto =>{
        const nombreProducto = producto.querySelector('.card-title').textContent.toLowerCase();
        if(nombreProducto.includes(filtro)){
            producto.style.display = 'block'; 
        } else{
            producto.style.display = 'none';
        }
    });
}






export{obtenerProductos};