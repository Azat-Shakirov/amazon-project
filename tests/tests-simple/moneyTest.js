//Automated testing = use code to test code
//Test case = situation
//Test suite = a group of related test cases

import {formatCurrency} from '../../scripts/utils/money.js';

console.log('test suite: formatCurrency');

console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95') { //basic case
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');

if (formatCurrency(0) === '0.00') { //edge case
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent 2000.5');

if (formatCurrency(2000.5) === '20.01') { //edge case
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent 2000.4');

if (formatCurrency(2000.4) === '20.00') { //edge case
  console.log('passed');
} else {
  console.log('failed');
}