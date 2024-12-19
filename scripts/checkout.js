import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCartFetch} from '../data/cart-class.js';
//import '../data/cart-class.js'; //runs all the code
// import '../data/car.js';
// import '../data/backend-practice.js';

//Promise = built-in class that works as Jasmin's done(). It takes a parameter 'resolve' that controls, as done(), when to go to the next step.
//It allows JS to do multiple things at the same time.
//Promises keep our code flat comparing to callbacks.

//Promise.all() = lets us run multiple promises at the same time, and wait for ALL of them to finish


//Async await = a shortcut for promises
//async = makes a function return a promise
//await = lets us wait for a promise to finish, before going to the next line. It lets us write asynchronous code like normal code, instead of 'then'.
//We can use await ONLY when we're inside an async function. The CLOSEST function has to be async. resolve(value), if there is no 'then', will be returned at the end => we can save it inside a variable.
//Also, await can be used with Promise.all


//Try & catch = help us handle the UNEXPECTED(outside of our control) errors. They can work in normal code as well. Whenever we get an error, it will skip the rest of the code and go directly to catch.
//In promises, throw does not work in the future, so there is 'reject' param.

async function loadPage() {
  try {
    // throw 'error1'; = manually creating an error

    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();



// // // // //             4)Fetch

/*
Promise.all([
  loadProductsFetch(), //this will return a promise
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});



// // // // //             3)Promise.all

// Promise.all([
//   new Promise((resolve) => {
//     loadProducts(() => {
//       resolve('value1'); //will be saved inside 'then'
//     });
//   }),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   })

// ]).then((values) => {
//   console.log(values);
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
// });



// // // // //              2)Promises

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1'); //will be saved inside 'then'
  });

}).then((value) => { //second step
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => { //third step
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/



// // // // //              1)Callback

// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
//   });
// });