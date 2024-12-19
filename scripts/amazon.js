//1.Save the data => Data Structure = Use arrays and objects to create a data structure
//2.Generate the HTML => Saved products objects into another file and used DOM to reuse the html for several products
//3.Make it interactive => Created an array in which we will add item when clicked 'Add to Cart', using ID.
//Data-Attribute(Kebab-case) = We can attach an attribute to any html element(data-nameOfAttribute="${}"). It also works with image, number.

//Modules = help us to prevent naming conflicts and doesn't need to follow order of files (only works with Live Server). HTML type="module" attribute that lets the file to get variables out of other files. Filepath '..' in import means to get out of the file. Import has to be written on the top of the code.

//External Libraries = we can use src="url path" to access code from the internet so we do not have to write it by ourselves. Usually, we can find the documentation of how to use it for this code.

import {cart} from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';

loadProducts(renderProductsGrid); //after we load the response => we run this function

function renderProductsGrid() {
  let productsHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {

      if (
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.keywords?.some((keyword) => {
          keyword.toLowerCase().includes(search.toLowerCase())
        })
      ) {
        return product;
      }
      
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>

              <div class="product-price">
                ${product.getPrice()}
              </div>

              <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              ${product.extraInfoHTML()}

              <div class="product-spacer"></div>

              <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary js-add-to-cart"
              data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>
    `;
  });

  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

  updateCartQuantity();

  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {

      let addedMessageTimeoutId;

      button.addEventListener('click', () => {
        const {productId} = button.dataset;
        cart.addToCart(productId);
        updateCartQuantity();

        const addedMessage = document.querySelector(
          `.js-added-to-cart-${productId}`
        );

        addedMessage.classList.add('added-to-cart-visible');

        if (addedMessageTimeoutId) {
          clearTimeout(addedMessageTimeoutId);
        }

        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);

        addedMessageTimeoutId = timeoutId;

      });
    });
  
  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
}