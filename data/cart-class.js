//Procedural Programming = a set of step-by-step instructions = a function
//Object-Oriented Programming (OOP) = organize our code into objects. It tries to represent the real world.

//Use PascalCase for things that generate objects
//Class = object generator = help us generate objects
//Constructor = has to be named constructor and should not return anything

import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems;
  #localStorageKey; //private property

  constructor(localStorageKey) { //runs automatically
    this.#localStorageKey = localStorageKey; 
    this.#loadFromStorage();
  }

  #loadFromStorage() { //shortcut for loadFromStorage: function()
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); 
  
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
  
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  addToCartAgain(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
    this.saveToStorage();
  }

  clearCart() {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem) {
        newCart.splice(0, 999);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (!matchingItem) {
      return;
    }
  
    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    }
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }
}

export const cart = new Cart('cart-oop'); //Instance of the class
const businessCart = new Cart('cart-business'); //saving parameters for constructor

// cart.localStorageKey = 'aaa'; To prevent this, class has 'private properties' that works only inside the class by adding '#'

// console.log(cart);
// console.log(businessCart);

// console.log(businessCart instanceof Cart);

// export function loadCart(fun) { //callback
//   const xhr = new XMLHttpRequest();

//   xhr.addEventListener('load', () => {
//     console.log(xhr.response);
//     fun();
//   });

//   xhr.open('GET', 'https://supersimplebackend.dev/cart');
//   xhr.send();
// }

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  
  const text = await response.text();
  console.log(text);
}