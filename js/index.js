
const productos = [];
let arrayCarrito = [];
const carrito = document.getElementById('carrito');
const  botonVaciar = document.getElementById('vaciar-carrito');
const precioTotal = document.getElementById('precioTotal');
const modal = document.getElementById('modal-container');
const comprar = document.getElementById('btn-comprar');
const formData = [];



comprar.addEventListener('click',() => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por tu Compra!',
        showConfirmButton: false,
        timer: 1500
      })
      arrayCarrito.length = 0;
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
    menuHamburguesa();
    boxCreate();
    aJson()

});


// Productos.

// Jeans
productos.push(new Producto(1,"jeanRotura","fashion","Jean", "Celeste gastado", true, 3990,"../img/productos catalogo/jeans1.png",1));
productos.push(new Producto(2,"jeanClasico","fashion","Jean", "Azul Oscuro", true, 3899,"../img/productos catalogo/jeans4.png",1));
productos.push(new Producto(3,"jeanLittleRoturas","fashion","Jean","Azul Claro", true, 3990,"../img/productos catalogo/jeans3.png",1)); 
productos.push(new Producto(5,"jeanClasicoRecto","fashion","Jean","Azul gastado", true, 3799,"../img/productos catalogo/jeans6.png",1));
productos.push(new Producto(6,"jeanRosa","fashion","Jean","Rosa", true, 3799,"../img/productos catalogo/jens2.png",1));

// Buzos
productos.push(new Producto(7,"buzoPink","fashion", "Buzo", "Rosa", true, 3499,"../img/productos catalogo/buzo2.png",1));
productos.push(new Producto(8,"buzoEstampaEspalda","fashion", "Buzo", "Celeste", true, 3599,"../img/productos catalogo/camp1.png",1));
productos.push(new Producto(9,"buzoWhite","fashion","Buzo", "Blanco", true, 3499,"../img/productos catalogo/buzo4.png",1));
productos.push(new Producto(10,"buzoGreen","fashion", "Buzo", "Verde", true, 3499,"../img/productos catalogo/buzo1.png",1));
productos.push(new Producto(11,"buzoCorto","fashion", "Buzo", "Gris Oscuro", true, 3499, "../img/productos catalogo/buzo3.png",1));

// Camperas
productos.push(new Producto(12,"camperaCorta","fashion", "Campera","Violeta", true, 3799,"../img/productos catalogo/camp3.png",1));
productos.push(new Producto(13,"camperaDeJean","fashion", "Campera", "Color Jean", true,4200,"../img/productos catalogo/camp2.png",1));
productos.push(new Producto(14,"camperaRoja","fashion", "Campera", "Red", true,7800,"../img/productos catalogo/camp4.png",1));
productos.push(new Producto(15,"camperaAzul","fashion", "Campera", "Azul", true,3899,"../img/productos catalogo/camp5.png",1));

// Remeras 
productos.push(new Producto(16,"remeraSublimada","fashion", "Remera", "Negro con gris", true,1999,"../img/productos catalogo/reme2.png",1));
productos.push(new Producto(17,"remeraCirculo","fashion", "Remera", "Negro", true, 1999,"../img/productos catalogo/reme5.png",1));
productos.push(new Producto(18,"remeraLove","fashion", "Remera", "Marron", true,1999,"../img/productos catalogo/reme3.png",1));
productos.push(new Producto(19,"remeraLisa","fashion", "Remera", "Blanca", true, 1899,"../img/productos catalogo/reme4.png",1));
productos.push(new Producto(20,"remeraCortaGris","fashion", "Remera", "Gris", true, 1999,"../img/productos catalogo/reme1.png",1));

// Zapatilla
productos.push(new Producto(21,"zapatillasBlack","fashion", "Zapatilla", "Negro", true,5799,"../img/productos catalogo/zapas3.png",1));



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


// Funcion creadora de las boxs de los productos
function boxCreate (){
    const contenedorProductos = document.getElementById('contenedor-productos');
        productos.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('pro');
        div.innerHTML = `
        <span>${producto.marca}</span>
        <h5 class="titulo">${producto.nombre}</h5>
        <img src="${producto.img}" alt="">
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
            pushearCarrito(`${producto.id}`);
            alert(`Se agrego al carrito ${producto.nombre}`);
            
        })
        });
        
        
};


// Pushear al Array Carrito 
function pushearCarrito(id){

        const existe = arrayCarrito.some(prod => prod.id == id)
        if(existe){
            const prod = arrayCarrito.map(prod =>{
                if(prod.id == id){
                    prod.cantidad++;
                   
                   
                }
            })
        }else{
            const producto = productos.find(function encontrarProducto(producto){
                if(producto.id == id){
                    return producto;
                }
            })
            arrayCarrito.push(producto);
        }
    
        
      localStorage.setItem('cart', JSON.stringify(arrayCarrito));
    renderizarCarrito();
    
};


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
        
        precioTotal.innerText = arrayCarrito.reduce((acc,producto) => acc + producto.precio, 0);
        precioTotal.innerText = arrayCarrito.reduce((acc,producto) => acc + producto.cantidad * producto.precio, 0);

    
    })
}



// Vaciar Carrito
botonVaciar.addEventListener('click', () => {
    Swal.fire({
        icon: 'error',
        title: 'Tu carrito fue vaciado',
        text: '',
        footer: '<a href="/index.html" </a>'
      })
    arrayCarrito.length = 0;
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























































