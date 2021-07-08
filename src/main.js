import App from './App.svelte';

import books from './books';

//local storage
Storage.prototype.setStuff = function (key, value) {
	this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getStuff = function (key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}

if (!localStorage.getStuff('unredBooks')) {
	localStorage.setStuff('unreadBooks', books);
	localStorage.setStuff('readBooks', []);
}

const app = new App({
	target: document.body
});

export default app;