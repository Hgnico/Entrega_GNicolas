//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');
let allProduct = [];
let totalCard = 0;
let countProduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
}
//Agregar Productos
function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);
        localStorage.setItem('carrito', JSON.stringify(allProduct));
        showCartAlert("Se agrego el producto a tu carrito");
    }
}
//Borrar Productos
function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');
        showCartAlert("Se elimino el Producto de tu carrito");
        allProduct.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(0); }
        });
        allProduct = allProduct.filter(product => product.id !== deleteId);
        countProduct--;
    }
    if (allProduct.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = "Tu carrito esta vacio"; }

    cargarHtml();
}
function readTheContent(product){
    const dataProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }
    totalCard = parseFloat(totalCard) + parseFloat(dataProduct.price);
    totalCard = totalCard.toFixed(0);
    const exist = allProduct.some(product => product.id === dataProduct.id);
    if (exist) {
        const pro = allProduct.map(product => {
            if (product.id === dataProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        allProduct = [...pro];
    } else {
        allProduct = [...allProduct, dataProduct]
        countProduct++;
    }
    cargarHtml();
}

function cargarHtml(){
    clearHtml();
    allProduct.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">$ ${price}</h5>
                <h6>Cantidad: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        containerBuyCart.appendChild(row);
        priceTotal.innerHTML = totalCard;
        amountProduct.innerHTML = 'Tenes ' + countProduct + ' articulo/s';
    });
}
// Limpieza carrito
 function clearHtml(){
    containerBuyCart.innerHTML = '';
 }

 // Función para mostrar alerta de carrito con SweetAlert
 function showCartAlert(message, icon = "success") {
    Swal.fire({
        title: "Carrito de Compras",
        text: message,
        icon: icon,
        showConfirmButton: false,
        timer: 2000 // 2 segundos
    });
}

// Evento confirmar compra
const checkoutButton = document.getElementById("checkout");
checkoutButton.addEventListener("click", () => {
if(allProduct.length===0){
    showCartAlert("Tu carrito esta vacio",icon="warning")
} else{
    Swal.fire({
        title: "Muchas gracias!",
        text: "Tu compra ha sido realizada",
        icon: "success",
    });
    containerBuyCart.classList.add('hidden-cart');
    allProduct = [];
    clearHtml();
    countProduct = 0
    totalCard = 0
    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = "Tu carrito esta vacio";
    localStorage.clear() //Borrar del local storage para que no quede cargado
}

});
// Funciones para mostrar / cerrar el carrito
function showCart(x){
document.getElementById("products-id").style.display = "block";
}

function closeBtn(){
document.getElementById("products-id").style.display = "none";
}
