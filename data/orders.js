import { cart } from "./cart-class.js";
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order); //add to the front of array
  saveToStorage();
  cart.clearCart();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}