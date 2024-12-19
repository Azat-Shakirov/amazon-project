import { orders } from "../data/orders.js";
import {cart} from '../data/cart-class.js';
import formatCurrency from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatDate } from "../data/deliveryOptions.js";

async function loadOrderPage() {
  await loadProductsFetch();

  renderOrdersPage();
}
loadOrderPage();

function renderOrdersPage() {
  console.log(orders);

  let ordersSummaryHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredOrders = orders;

  if (search) {
    filteredOrders = orders.filter((order) => {
      let matchesSearch = '';

      order.products.forEach((product) => {
        const productId = product.productId;
        const matchingProduct = getProduct(productId);

        if (!matchingProduct) return;

        if (
          matchingProduct.name?.toLowerCase().includes(search.toLowerCase()) ||
          matchingProduct.keywords?.some((keyword) => 
            keyword.toLowerCase().includes(search.toLowerCase())
          )
        ) {
          matchesSearch = true;
        }
      });
      
      return matchesSearch;
    });
  }

  filteredOrders.forEach((order) => {
    // if (!order.productId) {
    //   console.warn('Item missing id:', order);
    //   return;
    // }
  
    const orderId = order.id;
    const orderTime = formatDate(order.orderTime);
    const orderTotalCostCents = order.totalCostCents;
  
    ordersSummaryHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(orderTotalCostCents)}</div>
            </div>
          </div>
  
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div class="js-order-id">${orderId}</div>
          </div>
        </div>
  
        <div class="order-details-grid js-order-details-${orderId}">
        </div>
      </div>
    `;
  });
  
  document.querySelector('.js-orders-grid')
  .innerHTML = ordersSummaryHTML;


  filteredOrders.forEach((order) => {
    const orderId = order.id;
    let productHTML = '';

    order.products.forEach((product) => {
      const productId = product.productId;
      const productQuantity = product.quantity;
      const productDeliveryTime = formatDate(product.estimatedDeliveryTime);

      const matchingProduct = getProduct(productId);
  
      productHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Delivery date: ${productDeliveryTime}
          </div>
          <div class="product-quantity">
            Quantity: ${productQuantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${orderId}&productId=${productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    
    document.querySelector(`.js-order-details-${orderId}`)
    .innerHTML = productHTML;
  });

  updateCartQuantity();
  
  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();
  
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  };

  document.querySelectorAll(`.js-buy-again`)
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        cart.addToCartAgain(productId);
        updateCartQuantity();
      })
    });

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `orders.html?search=${search}`;
    });
}