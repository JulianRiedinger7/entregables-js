const assets = [
	'/',
	'/index.html',
	'css/styles.css',
	'/js/main.js',
	'/js/arrays.js',
	'/js/themeModule.js',
];

//Instalacion
self.addEventListener('install', (evt) => {
	evt.waitUntil(
		caches.open('assets').then((cache) => {
			cache.addAll(assets);
		})
	);
});

//Peticiones
self.addEventListener('fetch', (evt) => {
	evt.respondWith(
		caches
			.match(evt.request) //Searching cache
			.then((response) => {
				if (response) {
					//Request in cache
					return response; //cache hit
				} else {
					//To network
					return fetch(evt.request);
				}
			})
	);
});
