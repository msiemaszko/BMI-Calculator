/* main.js */

import { PI, double, Robot } from './lib';

console.log(PI); //3.141592
console.log(double(5)); //10

const robotron = new Robot('Robotron');
robotron.sayName(); //My name is Robotron


 // ===============================

 const input_weight = document.querySelector('.weight');
 const input_height = document.querySelector('.height');
 const guzik = document.querySelector('.guzik');

// alert(guzik.value);

function test() {
	alert('test: ' + guzik.value);
}
guzik.addEventListener('click', test);
