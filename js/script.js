const productCard = document.getElementById('product-container');

function cardMaker(productos) {
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
            <p class="card-text">$ ${producto.precio}<button type="button" class="btn"><i
                        class="fa-solid fa-cart-plus"></i></button></p>
        </div>
    </div>
</div>`;
    productCard.appendChild(nuevoProducto);
    nuevoProducto
      .getElementsByTagName('button')[0]
      .addEventListener('click', () => addToCart(producto));
  });
}

cardMaker(esmaltes);
