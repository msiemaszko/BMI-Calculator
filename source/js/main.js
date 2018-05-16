/* main.js */

// importowanie modułów
import { BMImeter } from './bmiMeter.js';
import { ListaStorage } from './listaStorage.js';


// Obsługa listy
const lista = new ListaStorage('score_list');

// Licznik bmi
const aplik = new BMImeter();

// Elementy DOM
const waga = document.querySelector('#weight_input');
const wzrost = document.querySelector('#height_input');
const imie = document.querySelector('#name_input');
const hand = document.querySelector('#hand');
const div_result = document.querySelector('.result');
const score_val = document.querySelector('#score_val');
const btn_zapisz = document.querySelector('#btn_zapisz');
const scores_list = document.querySelector('#scores_list');

var bmi_value, bmi_degree;

function policzProszeBMI() {
	let bmi = aplik.liczBMI(waga.value, wzrost.value);
	if (bmi) {
		bmi_value = bmi.value;
		bmi_degree = bmi.degree;

		// manipulate DOM
		div_result.style.visibility = 'visible';
		hand.style.visibility = 'visible';
		hand.style.transform = `rotate(${bmi_degree}deg)`;
		score_val.innerHTML = bmi_value;
	}
}

function zapiszWynik() {
	if (imie.value == "") return;
	let wynik = {
		imie: imie.value,
		bmi: bmi_value
	}
	lista.addItem(wynik);
	zaladujWyniki();

	// clear inputs
	waga.value = wzrost.value = imie.value = "";
}

function usunWynik(event){
	// event delegation: scores_list -> img
	if (event.target.matches('img')) {
		let index = event.target.dataset.heheszki;
		lista.delItem(index)
		zaladujWyniki();
	}
}

function zaladujWyniki() {
	scores_list.innerHTML = lista.getList().map((wynik, i) => {
		if (wynik == null) return;
		return `
		<tr>
			<td>${wynik.imie}</td>
			<td>${wynik.bmi}</td>
			<td><img src="img/ico_remove.png" data-heheszki="${i}" title="Skasuj wynik"/></td>
		</tr>`;
	}).join('');
	// ciekawostka: data-index

	//onclick="usunWynik(${i})"
	//sprawdzic dlaczego to nie dziala..
}

// Listenery
waga.addEventListener('change', policzProszeBMI);
wzrost.addEventListener('change', policzProszeBMI);
btn_zapisz.addEventListener('click', zapiszWynik);
window.addEventListener('load', zaladujWyniki);
scores_list.addEventListener('click', usunWynik);
