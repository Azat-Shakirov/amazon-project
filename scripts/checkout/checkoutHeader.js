import {cart} from '../../data/cart-class.js';

export function renderCheckoutHeader() {
  const cartQuantity = cart.calculateCartQuantity();

  const checkoutHeaderHTML = `
  <p class="js-checkout-header-middle">${cartQuantity} items</p>
  `;

  document.querySelector('.js-checkout-header-middle')
    .innerHTML = checkoutHeaderHTML;
}