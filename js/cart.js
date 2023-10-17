const productCard = document.getElementById('product-container');
const unitsElements = document.getElementById('units');
const priceElements = document.getElementById('price');
const emptyMessageElement = document.getElementById('emptyMessage');
const totalElments = document.getElementById('total');
const restartCartElement = document.getElementById('restart');
function cardMaker() {
  productCard.innerHTML = '';
  const productos = JSON.parse(localStorage.getItem('esmaltes'));
  console.log(productos);
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevoProducto = document.createElement('div');
      nuevoProducto.classList = 'card-product';
      nuevoProducto.innerHTML = `<div class="col-md-6 col-lg-3">
    <div class="card">
        <img src=${producto.img} class="card-img-top" >
        <div class="position-absolute top-0 start-0">
            <h5 class="card-title">Esmalte semipermanente</h5>
        </div>
        <div class="position-absolute bottom-0 start-0">
            <p class="card-text"><div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
            <button type="button" id="decrease" class="btn btn-outline-dark">-</button>
            <span id="counter" class="btn"> ${producto.cantidad}</span>
            <button type="button" id="increase" class="btn btn-outline-dark">+</button>
          </div>$ ${producto.precio}</p>
        </div>
    </div>
</div>


`;
      productCard.appendChild(nuevoProducto);
      nuevoProducto
        .getElementsByTagName('button')[1]
        .addEventListener('click', (e) => {
          //   addToCart(producto);
          const counterElement = e.target.parentElement.getElementsByTagName(
            'span'
          )[0];
          counterElement.innerText = addToCart(producto);
          updateTotal();
        });
      nuevoProducto
        .getElementsByTagName('button')[0]
        .addEventListener('click', (e) => {
          removeToCart(producto);
          cardMaker();
          updateTotal();
        });
    });
  }
}

cardMaker();
updateTotal();

function updateTotal() {
  const productos = JSON.parse(localStorage.getItem('esmaltes'));
  let units = 0;
  let price = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      units += producto.cantidad;
      price += producto.precio * producto.cantidad;
    });
    unitsElements.innerText = units;
    priceElements.innerText = price;
  }
  emptymessage();
}
function emptymessage() {
  const productos = JSON.parse(localStorage.getItem('esmaltes'));

  emptyMessageElement.classList.toggle(
    'hiden',
    productos && productos.length > 0
  );
  totalElments.classList.toggle('hiden', !(productos && productos.length > 0));
}
emptymessage();

restartCartElement.addEventListener('click', restartCart);
function restartCart() {
  localStorage.removeItem('esmaltes');
  updateTotal();
  cardMaker();
}
