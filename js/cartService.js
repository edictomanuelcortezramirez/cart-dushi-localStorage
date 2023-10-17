// Funcion para agregar producto al localStorage
function addToCart(producto) {
  // memoLocalStorage comprobara si hay producto agregados en el localStorage
  const memoLocalStorage = JSON.parse(localStorage.getItem('esmaltes'));
  console.log(memoLocalStorage);
  let count = 0;
  if (!memoLocalStorage) {
    const createProduct = getNewProduct(producto);
    localStorage.setItem('esmaltes', JSON.stringify([createProduct]));
    count = 1;
  } else {
    const indexProduct = memoLocalStorage.findIndex(
      (esmalte) => esmalte.id === producto.id
    );
    console.log(indexProduct);
    const newMemoLocalStorage = memoLocalStorage;
    if (indexProduct === -1) {
      newMemoLocalStorage.push(getNewProduct(producto));
      count = 1;
    } else {
      newMemoLocalStorage[indexProduct].cantidad++;
      count = newMemoLocalStorage[indexProduct].cantidad;
    }
    localStorage.setItem('esmaltes', JSON.stringify(newMemoLocalStorage));
  }
  updateCartCounter();
  return count;
}
function removeToCart(producto) {
  const memoLocalStorage = JSON.parse(localStorage.getItem('esmaltes'));
  const indexProduct = memoLocalStorage.findIndex(
    (esmalte) => esmalte.id === producto.id
  );
  if (memoLocalStorage[indexProduct].cantidad === 1) {
    memoLocalStorage.splice(indexProduct, 1);
  } else {
    memoLocalStorage[indexProduct].cantidad--;
  }
  localStorage.setItem('esmaltes', JSON.stringify(memoLocalStorage));
  updateCartCounter();
}
function getNewProduct(producto) {
  const createProduct = producto;
  createProduct.cantidad = 1;
  return createProduct;
}
const countCart = document.getElementById('count-cart');
function updateCartCounter() {
  const memoLocalStorage = JSON.parse(localStorage.getItem('esmaltes'));
  if (memoLocalStorage && memoLocalStorage.length > 0) {
    const count = memoLocalStorage.reduce(
      (acum, current) => acum + current.cantidad,
      0
    );
    countCart.innerText = count;
  } else {
    countCart.innerText = 0;
  }
}
updateCartCounter();
