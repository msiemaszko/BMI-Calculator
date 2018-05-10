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
		 bmi_max: 18.5,
		 deg_min: 17,
		 deg_max: 62
	 },
	 s2: {
		 bmi_min: 18.5,
		 bmi_max: 22.9,
		 deg_min: 65,
		 deg_max: 105
	 }
 }

function licz_bmi() {
	let weight = waga.value;
	let height = wzrost.value / 100;
	let bmi = weight / ( height * height );

	var deg_min;
	var deg_max;
	var deg_0;
	var deg;
	var type;

	let max_bmi = 45;

	// skala[0][min]

	// let deg = bmi/max_bmi * 360
	// alert(`twoje BMI to: ${bmi}`);
	// type = 's1';
	if ( bmi >= skala.s1.bmi_min && bmi < skala.s1.bmi_max ) {			// 0 - 18.5
		alert('skala1');
		type = 's1';
	} else
	if ( bmi < skala.s2.bmi_max ){										// 18.5 - 22.9
		type = 's2';
	}

	alert( type );


	// deg_min = 65;
	// deg_max = 105;
	bmi_min = skala[type].bmi_min;
	bmi_max = skala[type].bmi.max;
	deg_min = skala[type].deg_min;
	deg_max = skala[type].deg_max;
	deg = (bmi - bmi_min)/(bmi_max - bmi_min) * (deg_max - deg_min);
	hand.style.transform = `rotate($ deg}deg)`;
}
 // hand.style.transform = "rotate(60deg)"

guzik.addEventListener('click', licz_bmi);
waga.addEventListener('change', licz_bmi);
