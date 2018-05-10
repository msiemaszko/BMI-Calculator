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
 const hand = document.querySelector('#hand');

 const skala = {
	 s1: {
		 bmi_min: 0,
		 bmi_max: 18.5
	 }
 }

// alert(waga.value);

function licz_bmi() {
	let weight = waga.value;
	let height = wzrost.value / 100;
	let bmi = weight / ( height * height );

	var deg_min;
	var deg_max;
	var deg_0;
	var deg;

	let max_bmi = 45;

	// skala[0][min]

	// let deg = bmi/max_bmi * 360
	// alert(`twoje BMI to: ${bmi}`);

	if ( bmi >= skala.s1.min && bmi < skala.s1.max ) {			// 0 - 18.5
		deg_min = 17;
		deg_max = 62;
		deg = (bmi / 18.5) * (deg_max - deg_min);
	} else
	if ( bmi < 22.9 ){						// 18.5 - 22.9
		deg_min = 65;
		deg_max = 105;
		deg = (bmi - 18.5)/(22.9 - 18.5) * (deg_max - deg_min);
	}
	// alert( bmi );\
	// let deg = 90;
	hand.style.transform = `rotate(${deg_min + deg}deg)`;
}
 // hand.style.transform = "rotate(60deg)"

guzik.addEventListener('click', licz_bmi);
