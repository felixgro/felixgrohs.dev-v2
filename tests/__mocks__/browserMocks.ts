// Mock Browser API's which are not supported by JSDOM, e.g. ServiceWorker, LocalStorage
/**
 * An example how to mock localStorage is given below 👇
 */

/* 
// Mocks localStorage
const localStorageMock = (function() {
	let store = {};

	return {
		getItem: (key) => store[key] || null,
		setItem: (key, value) => store[key] = value.toString(),
		clear: () => store = {}
	};

})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
}); */

// FIXME: this does not work on each HTMLELement in JSDOM
const getBoundingClientRectMock = (() => ({
	top: 0,
	left: 0,
	width: 0,
	height: 0,
	right: 0,
	bottom: 0
}))();

Object.defineProperty(HTMLElement, 'getBoundingClientRect', {
	value: getBoundingClientRectMock
});

// TODO: add HTMLElement.animate() mock