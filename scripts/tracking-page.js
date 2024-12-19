import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import { formatDate } from "../data/deliveryOptions.js";
import { cart } from "../data/cart-class.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadTrackingPage() {
  await loadProductsFetch();

  renderTrackingPage();
}
loadTrackingPage();

function renderTrackingPage() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  let matchingOrderCheck = '';
  let matchingProductCheck = '';

  orders.forEach((order) => {
    if (orderId === order.id) {
      matchingOrderCheck = order;
    }
  });

  const matchingOrder = matchingOrderCheck;

  matchingOrder.products.forEach((product) => {
    if (productId === product.productId) {
      matchingProductCheck = product;
    }
  });

  const matchingProduct = matchingProductCheck;
  const findingProduct = getProduct(productId);
  console.log(matchingOrder)

  const productQuantity = matchingProduct.quantity;

  const productDeliveryTime = formatDate(matchingProduct.estimatedDeliveryTime);

  let trackingSummaryHTML = '';

  const today = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(matchingProduct.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  trackingSummaryHTML += `
    <div class="delivery-date">
      Arriving on ${productDeliveryTime}
    </div>

    <div class="product-info">
      ${findingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${productQuantity}
    </div>

    <img class="product-image" src="${findingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label 
        ${percentProgress < 50 ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label 
        ${percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label 
        ${percentProgress >= 100 ? 'current-status' : ''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;">
      </div>
    </div>
    
  `;

  document.querySelector(`.js-order-container`)
    .innerHTML = trackingSummaryHTML;
  
  updateCartQuantity();

  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();
  
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  };

}