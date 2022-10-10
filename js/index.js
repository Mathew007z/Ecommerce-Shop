
const productos = [];
let productos2 = [];
let arrayCarrito = [];
const carrito = document.getElementById('carrito');
const  botonVaciar = document.getElementById('vaciar-carrito');
const precioTotal = document.getElementById('precioTotal');
const modal = document.getElementById('modal-container');
const comprar = document.getElementById('btn-comprar');
const badge = document.getElementById('badge');
const cartLogo = document.querySelector(".agregar__carrito");


comprar.addEventListener('click',() => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu compra se realizó con Éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      arrayCarrito.length = 0;
      badge.innerText = 0;
      precioTotal.innerText = 0;
      renderizarCarrito()
})


// DOMContentLoaded
function aJson (){
    if(localStorage.getItem('cart')){
        arrayCarrito = JSON.parse(localStorage.getItem('cart'));
        renderizarCarrito();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    menuHamburguesa();
    boxCreate();
    aJson()
    

});



// Menu Hamburguesa
function menuHamburguesa(){
    const btn_menu = document.querySelector('.btn_menu')
    if(btn_menu){
        btn_menu.addEventListener('click', ()=>{
            const menu_items = document.querySelector('.menu_items')
            menu_items.classList.toggle('show')
        });
    }
}


async function fetchData(){
    const res = await fetch("/js/data.json");
    const data = await res.json();
    productos2 = data;
    boxCreate();
}


// Funcion creadora de las boxs de los productos
function boxCreate (){
    const contenedorProductos = document.getElementById('contenedor-productos');
        productos2.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('pro');
        div.innerHTML = `
        <span>${producto.marca}</span>
        <h5 class="titulo">${producto.nombre}</h5>
        <img src="${producto.img}" alt="prenda de ropa">
        <div class="star">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        </div>
        <h4>$${producto.precio}</h4>
        <p>Cantidad:${producto.cantidad}</p>
        <a class="agregar__carrito" id="button${producto.id}"><i class="bi bi-cart cart"></i></a>
        `
        contenedorProductos.appendChild(div);
        const agregar = document.getElementById(`button${producto.id}`);
        agregar.addEventListener('click',() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se agregó el producto al carrito',
                showConfirmButton: false,
                timer: 1500
              })
            pushearCarrito(`${producto.id}`);
            
            
        })
        });
        
        
};




function pushearCarrito(){
    fetch("/js/data.json")
    .then((resp)=> resp.json())
    .then((data)=>{
        console.log(data);
        // if(arrayCarrito.find((prod) => e.target.prod.id === prodId)){
        //     const i = arrayCarrito.find((prod) => prod.id === prodId);
        //     i.cantidad++;
        // }
        // else{
        //     const i = data.find((prod) => e.target.prod.id === prodId);
        //     arrayCarrito.push(i);
        // }
        // localStorage.setItem('cart', JSON.stringify(arrayCarrito));
        // renderizarCarrito()
    })
}


// // Pushear al Array Carrito 
// function pushearCarrito(id){

    
//     fetch("/js/data.json")
//     .then((response)=> response.json())
//     .then((data)=>{
//         console.log(data)
//         data.forEach((prod) =>{
//             const existe = arrayCarrito.some(prod => prod.id == id.target.id)
//             if(existe){
//                 const prod = arrayCarrito.map(prod =>{
//                     if(prod.id == id.target.id){
//                         prod.cantidad++;
                        
//                     }
//                 })
//             }else{
//                 const producto = productos2.find(function encontrarProducto(producto){
//                     if(producto.id == id.target.id){
//                         return producto;
//                     }
//                 })
//                 arrayCarrito.push(producto);
//             }
        
            
//           localStorage.setItem('cart', JSON.stringify(arrayCarrito));
          
//         renderizarCarrito();
//         })
//         }
      
    

// )};




// Funcion para renderizarCarrito  
function renderizarCarrito(){
    modal.innerHTML = "";
     if(arrayCarrito.length < 1){
          return;}
     arrayCarrito.forEach(function renderizarProducto(producto){
         let productoContainer = document.createElement('div');
         productoContainer.classList.add('proId');
         productoContainer.id = producto.id
         productoContainer.innerHTML = `
         <h5 class="titulo">${producto.nombre}:</h5>
         <h4 class="price">$${producto.precio}</h4>
         <a class="cantidad">Cantidad:${producto.cantidad}</a>
         <a class="agregar__carrito agregar__carrito--2" id="eliminar${producto.id}">Retirar</a>`
         modal.appendChild(productoContainer);
         const eliminar = document.getElementById(`eliminar${producto.id}`)
         eliminar.addEventListener('click', (id) => {
             eliminarDelCarrito(producto.id)
         })
         badge.innerText = arrayCarrito.length
         precioTotal.innerText = arrayCarrito.reduce((acc,producto) => acc + producto.precio, 0);
         precioTotal.innerText = arrayCarrito.reduce((acc,producto) => acc + producto.cantidad * producto.precio, 0);
 
     
     })
 }
 
 


// Vaciar Carrito
botonVaciar.addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'Tu carrito se vació con Éxito',
        text: '',
        footer: '<a href="/index.html" </a>'
      })
    arrayCarrito.length = 0;
    badge.innerText = 0;
    precioTotal.innerText = arrayCarrito.reduce((acc,producto) => acc - producto.precio, 0);
    localStorage.setItem('cart', JSON.stringify(arrayCarrito));
    renderizarCarrito();
})



// Eliminar Producto del carrito


function eliminarDelCarrito(id){
    const existe = arrayCarrito.some(prod => prod.id == id)
if (existe) {
    arrayCarrito.map(prod =>{
        if(prod.id == id){
            prod.cantidad--;
            badge.innerText = 0;
            if(prod.cantidad < 1){
                arrayCarrito = arrayCarrito.filter(prod => prod.id != id)
            }
        }
    })
}

precioTotal.innerText = arrayCarrito.reduce((acc,producto) => acc - producto.precio, 0);
localStorage.setItem('cart', JSON.stringify(arrayCarrito));
renderizarCarrito();
}
























































