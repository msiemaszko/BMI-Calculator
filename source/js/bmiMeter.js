/* bmiMeter.js */

const skala = {
	s1: {
		bmi_min: 18.5,
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


class BMImeter {
	constructor() {
		var bmi;
	}
	liczBMI(waga, wzrost) {

		if (waga == "" || wzrost == "" ) return false;

		let bmi_meter, bmi_min, bmi_max, deg_min, deg_max, deg, oo;
		let max_bmi = 45;

		// counting BMI
		wzrost = wzrost/100;
		let bmi = waga / ( wzrost * wzrost );
		bmi = Math.round( bmi * 100)/100;
		bmi_meter = Math.min( max_bmi, bmi);

		// maching proper scale object
		if ( bmi_meter >= 0 && bmi_meter < skala.s1.bmi_min	) {
			oo = null;
		} else
		if ( bmi_meter >= skala.s1.bmi_min && bmi_meter <= skala.s1.bmi_max ) {		// 0 - 18.5
			oo = skala.s1;
		} else
		if ( bmi_meter <= skala.s2.bmi_max ){										// 18.5 - 22.9
			oo = skala.s2;
		} else
		if ( bmi_meter <= skala.s3.bmi_max ){										// 23 - 24.9
			oo = skala.s3;
		} else
		if ( bmi_meter <= skala.s4.bmi_max ) {										// 40 - infinity
			oo = skala.s4;
		}

		// counting degrees
		if (oo != null) {
			bmi_min = oo.bmi_min;
			bmi_max = oo.bmi_max;
			deg_min = oo.deg_min;
			deg_max = oo.deg_max;
			deg = deg_min + (bmi_meter - bmi_min)/(bmi_max - bmi_min) * (deg_max - deg_min);
		} else deg = 0;

		// return object
		return {
			value: bmi,
			degree: deg
		}
	}
}

export {BMImeter}
