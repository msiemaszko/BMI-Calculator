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

 var skala = {
	 s1: {
		 bmi_min: 0,
		 bmi_max: 24.9,
		 deg_min: 5,
		 deg_max: 45
	 },
	 s2: {
		 bmi_min: 25,
		 bmi_max: 29.9,
		 deg_min: 45,
		 deg_max: 90
	 },
	 s3: {
		 bmi_min: 30,
		 bmi_max: 39.9,
		 deg_min: 90,
		 deg_max: 135
	 },
	 s4: {
		 bmi_min: 40,
		 bmi_max: 45,
		 deg_min: 135,
		 deg_max: 177
	 }
 }

 var bmi_min;
 var bmi_max;
 var deg_min;
 var deg_max;
 var deg;
 let max_bmi = 45;
 var oo = skala.s1;


function licz_bmi() {
	let weight = waga.value;
	let height = wzrost.value / 100;
	let bmi = Math.min( 45, weight / ( height * height ));

	// deg = (bmi/45) * 180;

	if ( bmi >= skala.s1.bmi_min && bmi <= skala.s1.bmi_max ) {			// 0 - 18.5
		oo = skala.s1;
	} else
	if ( bmi <= skala.s2.bmi_max ){										// 18.5 - 22.9
		oo = skala.s2;
	} else
	if ( bmi <= skala.s3.bmi_max ){										// 23 - 24.9
		oo = skala.s3;
	} else {																// 40 - infinity
		oo = skala.s4;
	}

	bmi_min = oo.bmi_min;
	bmi_max = oo.bmi_max;
	deg_min = oo.deg_min;
	deg_max = oo.deg_max;
	deg = deg_min + (bmi - bmi_min)/(bmi_max - bmi_min) * (deg_max - deg_min);
	hand.style.visibility = 'visible';
	hand.style.transform = `rotate(${deg}deg)`;
}

guzik.addEventListener('click', licz_bmi);
waga.addEventListener('change', licz_bmi);
