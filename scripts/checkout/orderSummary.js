//MVC = technique where we split our code into 3 parts: Model => View => Controller.
//1. Model = saves and manages the data (our data folder)
//2. View = takes the data and displays it on the page (generating HTML)
//3. Controller = runs some code when we interact with the page (event listeners)

import {cart} from '../../data/cart-class.js'; //named export
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; //ESM version of the library to work with modules
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //default export, allows to export only 1 thing from the file
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';

export function renderOrderSummary() {
  renderCheckoutHeader();

  let cartSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {
    if (!cartItem.productId) {
      console.warn('Item missing id:', cartItem);
      return;
    }

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    if (!matchingProduct) {
      console.warn('Product not found for id:', productId);
      return;
    }

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">

      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
      `
    });

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        cart.removeFromCart(productId);
        
        renderOrderSummary();
        renderCheckoutHeader();
        renderPaymentSummary();
      });
    });

  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        
        document.querySelector(`.js-cart-item-container-${productId}`)
          .classList.add('is-editing-quantity');
      });
    });

  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        
        const quantityInputElement = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantityInputElement.value);

        if (newQuantity < 1 || newQuantity >= 1000) {
          alert('Quantity must be at least 1 and less than 1000');
          return;
        }

        cart.updateQuantity(productId, newQuantity);

        document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove('is-editing-quantity');

        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        
        quantityLabel.innerHTML = newQuantity;

        renderCheckoutHeader();
        renderPaymentSummary();
      });
    });

    document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          const {productId, deliveryOptionId} = element.dataset;
          cart.updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary(); //recursion
          renderPaymentSummary();
        });
      });
  }