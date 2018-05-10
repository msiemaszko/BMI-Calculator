/* main.js */

import { PI, double, Robot } from './lib';

console.log(PI); //3.141592
console.log(double(5)); //10

const robotron = new Robot('Robotron');
robotron.sayName(); //My name is Robotron


 // ===============================

 const waga = document.querySelector('#weight_input');
 const wzrost = document.querySelector('#height_input');
 const guzik = document.querySelector('#guzik');

// alert(waga.value);

function licz_bmi() {
	let weight = waga.value;
	let height = wzrost.value;
	let bmi = weight / ( height * height );
	// alert(`twoje BMI to: ${bmi}`);
	alert( bmi );
}
guzik.addEventListener('click', licz_bmi);
