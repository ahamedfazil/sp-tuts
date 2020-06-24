function Basic1() {
  //                         *Types, Variables, Operators & Operands*                         //

  //   *Types and Variables
  var myNum = 9; // Number
  var myName = 'sdsd'; // String
  var isLoaded = false; // Boolean
  var arr_dummy = []; // Array

  var arr_Names = ['Faz', 'Aha', 'Rabi']; // Array of strings
  var arr_Numbers = [2, 3, 4, 9]; // Array of numbers
  var obj = {};

  var obj_user = {
    name: 'Ahamed',
    location: 'NL',
    phone: 1231233,
  };

  //   *Operators and Operands

  // Add -> +
  var add_operation = 3 + 2;
  console.log('Log: add_operation', add_operation);

  // Sub -> -
  var sub_operation = 3 - 2;
  console.log('Log: sub_operation', sub_operation);

  // Multiply -> *
  var mul_operation = 3 * 2;
  console.log('Log: mul_operation', mul_operation);

  // Division -> /
  var division_operation = 4 / 2;
  console.log('Log: division_operation', division_operation);

  // Module -> %
  var mod_operation = 3 % 2;
  console.log('Log: mod_operation', mod_operation);

  // Increment -> ++
  var d = 3;
  var incr_operation = d++;
  console.log('Log: incr_operation', incr_operation);

  // Decrement -> --
  var dec_operation = d--;
  console.log('Log: dec_operation', dec_operation);

  // Ternary Operatory ---->  Condition ? true : false;

  var ter_operation = 3 !== 3 ? 'equal' : 'not equal';
  console.log('Log: ter_operation', ter_operation);

  //                         *Array and its functions *                         //
  //Map

  const myArr1 = [1, 7, 8, 6];
  const map1 = myArr1.map((x) => x * 2);
  console.log('Log: map1', map1);

  //Filter
  const myArr2 = ['horse', 'elephant', 'lion', 'peacock', 'hen', 'crocodile'];
  const filter1 = myArr2.filter((word) => word.length > 6);
  console.log('Log: filter1', filter1);

  //Push
  let myArr3 = ['soccer', 'baseball'];
  console.log('Log: myArr3', myArr3);
  let push1 = myArr3.push('football', 'swimming');
  console.log('Log: push1', push1);

  //                         *JSON Object*                         //

  // Object
  var myObj = { name: 'Faz', phone: 123123123 };
  console.log('Log: myObj', myObj);
  console.log('Log: myObj', myObj.name);

  // JSON Array of Object
  var myJSON_ArrObj = [
    { name: 'Faz', phone: 123123 },
    { name: 'Rabi', phone: 345345 },
  ];
  console.log('Log: myJSON_ArrObj', myJSON_ArrObj.length);

  //                         *Dates*                         //
  const myDate = new Date();
  console.log('Log: myDate', myDate);
  console.log('Log: myDate.getDate()', myDate.getDate());
}

//                         *this*                         //
// this keyword refers to an object, that object which is executing the current bit of javascript code
function carName() {
  console.log(this.name);
}

var name = 'Mazda';
var obj1 = { name: 'BMW' };
var obj2 = { name: 'Audi' };

bike(); // "Mazda"
obj1.bike(); // "BMW"
obj2.bike(); // "Audi"

//                         *Functions*                         //

$(document).ready(function () {
  // Simple return function
  function myFunction(a, b) {
    return a * b;
  }
  var x = myFunction(4, 3);
  console.log('Log: x', x);
  document.getElementById('dummyID').innerHTML = x;

  Basic1();
});

// IIFE
(function () {
  console.log('I called from IIFE');
})();

(function (name) {
  console.log('My Name is' + name);
})('Fazil');

// Declaration
function Mydeclared() {
  console.log('Declared Function called');
}

const myFunctionName = () => {
  console.log('Arrow Function called');
};

// console.log(Mydeclared);

// Expression - Declaring a function to a variable
var expFunc = function () {
  console.log('Expression Function called');
};

// Arrow function - ES6
const myArrowFunc = () => {
  console.log('My Arrow function called');
};

// Function with arithmetic operation
function add_number() {
  var first_number = parseInt(document.getElementById('Text1').value);
  var second_number = parseInt(document.getElementById('Text2').value);
  var result = first_number + second_number;
  document.getElementById('txtresult').value = result;
}

function twoNumber(a, b, type) {
  if (type === 'add') {
    console.log(a + b);
  } else if (type === 'sub') {
    console.log(a - b);
  }
}

twoNumber(3, 3, 'add');
twoNumber(3, 3, 'sub');
twoNumber(3, 3, 'mul');
