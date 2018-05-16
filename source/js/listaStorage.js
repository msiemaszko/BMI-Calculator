// listaStorage.js

class ListaStorage {
	constructor(name) {
		// pobiera liste z klucza localStorage albo tworzy nową
		this.storageName = name;
		this.lista = JSON.parse(localStorage.getItem(name)) || [];
	}
	getList() {
		return this.lista;
	}
	updateStorage() {
		// console.log(this.storageName);
		localStorage.setItem(this.storageName, JSON.stringify(this.lista));
	}

	addItem(item) {
		this.lista.push(item);
		this.updateStorage();
	}

	delItem(no){
		delete this.lista[no];
		this.updateStorage();
	}
}

export { ListaStorage }
