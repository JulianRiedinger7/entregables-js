import {
	rolesYAgentes,
	rangos,
	equiposMasters,
	valorantPoints,
} from './arrays.js';
import { URL_VP, fetchApi, precioVentaOficial } from './fetchApi.js';
import { lightMode, darkMode } from './themeModule.js';

document.body.scrollIntoView(false);

const mainContainer = document.querySelector('.main-container');

const contenedorAgentes = document.createElement('div');
contenedorAgentes.classList.add('grid-container');

const contenedorRangos = document.createElement('div');
contenedorRangos.classList.add('grid-container');
contenedorRangos.setAttribute('id', 'contenedor-rangos');

const contenedorEquipos = document.createElement('div');
contenedorEquipos.classList.add('grid-container');

const contenedorFavs = document.createElement('div');

const nickForm = document.querySelector('#formulario');

const IMP_ARG = 1.66;

//vp = valorant points
const vpContainer = document.createElement('div');
vpContainer.classList.add('grid-container');

let infoUser = {};

const btnTheme = document.querySelector('#btn-theme');

document.addEventListener('DOMContentLoaded', () => {
	localStorage.getItem('theme') === 'light' ? lightMode() : darkMode();
	mostrarStorage();
});

window.addEventListener('load', () => {
	document.body.classList.remove('no-scrollable');
	document.querySelector('.lds-ring').remove();
});

btnTheme.addEventListener('click', () => {
	localStorage.getItem('theme') === 'light' ? darkMode() : lightMode();
});

//Recupera los datos del input text escuchando el evento submit del form, generando una bienvenida.
const darBienvenida = (evt) => {
	evt.preventDefault();
	const userNick = document.querySelector('#fnick').value;

	if (userNick === '' || userNick.length > 20) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Ingresa nuevamente un nick!',
		});
		nickForm.reset();
	} else {
		nickForm.classList.add('hidden');
		const h2 = document.createElement('h2');
		h2.innerHTML = `Hola ${userNick.toUpperCase()}, espero estes muy bien!`;

		mainContainer.appendChild(h2);
		infoUser.nick = userNick.toUpperCase();
		nickForm.reset();
		decidirCamino();
	}
};

const decidirCamino = () => {
	mainContainer.innerHTML += `
		<div class='flex-container'>
			<h3>Que deseas hacer? 🤔</h3>
			<button class='btn' id='btnInfo'>Informacion</button>
			<button class='btn' id='btnVP'>Conversion VP</button>
		</div>
	`;

	const btnInfo = document.querySelector('#btnInfo');
	const btnVP = document.querySelector('#btnVP');

	btnInfo.addEventListener('click', () => {
		document.querySelector('.flex-container').remove();
		mostrarAgentes(rolesYAgentes);
		mostrarRangos(rangos);
		mostrarEquiposMasters(equiposMasters);
	});

	btnVP.addEventListener('click', () => {
		document.querySelector('.flex-container').remove();
		mostrarVP(valorantPoints);
	});
};

nickForm.addEventListener('submit', darBienvenida);

const crearCard = () => {
	const titulo = document.createElement('h2');
	const imagen = document.createElement('img');
	const estrella = document.createElement('a');

	estrella.setAttribute('href', '#contenedor-rangos');
	estrella.innerHTML = 'Agregar ⭐ ';
	estrella.classList.add('estrella');
	estrella.addEventListener('click', marcarComoFavorito);

	return {
		titulo,
		imagen,
		estrella,
	};
};

//Muestra todos los agentes del array a partir de la funcion crearCard
const mostrarAgentes = (rolesYAgentes) => {
	contenedorAgentes.innerHTML = '';
	const titulo = document.createElement('h3');
	titulo.textContent = 'Elige tu agente favorito 🔥';
	titulo.classList.add('align-left');
	mainContainer.appendChild(titulo);

	const soloAgentes = rolesYAgentes.map(({ agentes }) => agentes).flat();
	soloAgentes.forEach((agente) => {
		const contenedorAgente = document.createElement('div');
		contenedorAgente.classList.add('contenedor-agente');
		const { titulo, imagen, estrella } = crearCard();

		titulo.innerHTML = agente.toUpperCase();
		imagen.setAttribute('src', `./img/${agente.toLowerCase()}.jpg`);
		imagen.setAttribute('alt', `${agente}`);

		contenedorAgente.appendChild(titulo);
		contenedorAgente.appendChild(imagen);
		contenedorAgente.appendChild(estrella);
		contenedorAgentes.appendChild(contenedorAgente);
	});
	mainContainer.appendChild(contenedorAgentes);
};

//Muestra todos los rangos del array a partir de la funcion crearCard
const mostrarRangos = (rangos) => {
	contenedorRangos.innerHTML = '';
	const h3 = document.createElement('h3');
	h3.textContent = 'Selecciona tu rango ';
	h3.classList.add('align-left');
	mainContainer.appendChild(h3);
	rangos.forEach(({ nombre }) => {
		const contenedorRango = document.createElement('div');
		contenedorRango.classList.add('contenedor-rango');
		const { titulo, imagen, estrella } = crearCard();

		titulo.innerHTML = `${nombre.toUpperCase()}`;
		imagen.setAttribute('src', `./img/rangos/${nombre.toLowerCase()}.webp`);
		imagen.setAttribute('alt', `${nombre}`);

		contenedorRango.appendChild(titulo);
		contenedorRango.appendChild(imagen);
		contenedorRango.appendChild(estrella);
		contenedorRangos.appendChild(contenedorRango);
	});
	mainContainer.appendChild(contenedorRangos);
};

//Muestra todos los equipos del array a partir de la funcion crearCard
const mostrarEquiposMasters = (equipos) => {
	contenedorEquipos.innerHTML = '';
	const titulo = document.createElement('h3');
	titulo.textContent = 'Elige tu equipo favorito de la Masters de Reykjavik';
	titulo.classList.add('align-left');
	mainContainer.appendChild(titulo);
	equipos.forEach(({ nombre }) => {
		const contenedorEquipo = document.createElement('div');
		contenedorEquipo.classList.add('contenedor-equipo');
		const { titulo, imagen, estrella } = crearCard();

		titulo.innerHTML = `${nombre.toUpperCase()}`;
		imagen.setAttribute('src', `./img/equipos/${nombre.toLowerCase()}.png`);
		imagen.setAttribute('alt', `${nombre}`);

		contenedorEquipo.appendChild(titulo);
		contenedorEquipo.appendChild(imagen);
		contenedorEquipo.appendChild(estrella);
		contenedorEquipos.appendChild(contenedorEquipo);
	});
	mainContainer.appendChild(contenedorEquipos);
};

const countFavoriteContainer = (container) =>
	container.getElementsByClassName('favorito').length;

//Si el contenedor clickeado no tiene la clase favorito, lo agrega como uno, pasando la info al storage, y sino lo quita
//Si se intenta agregar otro contenedor mientras ya hay uno como favorito de la misma clase, se lanza el error de SweetAlert

const marcarComoFavorito = (evt) => {
	evt.preventDefault();
	const contenedor = evt.target.parentElement;
	if (
		contenedor.classList.contains('contenedor-agente') &&
		countFavoriteContainer(contenedorAgentes) === 0
	) {
		contenedor.classList.add('favorito');
		contenedor.getElementsByClassName('estrella')[0].innerHTML = `Quitar ❌`;
		infoUser.agente = contenedor.firstElementChild.textContent;
		listaFavoritos(infoUser);
	} else if (
		contenedor.classList.contains('contenedor-rango') &&
		countFavoriteContainer(contenedorRangos) === 0
	) {
		contenedor.classList.add('favorito');
		contenedor.getElementsByClassName('estrella')[0].innerHTML = `Quitar ❌`;
		infoUser.rango = contenedor.firstElementChild.textContent;
		listaFavoritos(infoUser);
	} else if (
		contenedor.classList.contains('contenedor-equipo') &&
		countFavoriteContainer(contenedorEquipos) === 0
	) {
		contenedor.classList.add('favorito');
		contenedor.getElementsByClassName('estrella')[0].innerHTML = `Quitar ❌`;
		infoUser.equipo = contenedor.firstElementChild.textContent;
		listaFavoritos(infoUser);
	} else if (
		(countFavoriteContainer(contenedorAgentes) === 1 ||
			countFavoriteContainer(contenedorRangos) === 1 ||
			countFavoriteContainer(contenedorEquipos) === 1) &&
		!contenedor.classList.contains('favorito')
	) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: `Primero debes quitar tu seleccion de ${
				contenedor.parentElement.getElementsByClassName('favorito')[0]
					.firstElementChild.textContent
			}!`,
			backdrop: `rgba(0,0,0,0.7)`,
		});
	} else {
		contenedor.classList.remove('favorito');
		contenedor.getElementsByClassName('estrella')[0].innerHTML = `Agregar ⭐`;
	}

	almacenarStorage(infoUser);
};

//Genera la lista con los contenedores agregados a favoritos, o con la informacion recuperada del localStorage
const listaFavoritos = ({ agente, rango, equipo }) => {
	contenedorFavs.innerHTML = '';
	contenedorFavs.classList.add('contenedor-favs');

	const agenteInfo = rolesYAgentes.find(({ agentes }) =>
		agentes.some((item) => item.toUpperCase() === agente)
	);
	const equipoInfo = equiposMasters.find(
		({ nombre }) => nombre.toUpperCase() === equipo
	);
	const rangoInfo = rangos.find(({ nombre }) => nombre.toUpperCase() === rango);

	if (agenteInfo) {
		contenedorFavs.innerHTML = `
    <h2>🔥 Tus Favoritos 🔥</h2>
    <div class='contenedor-agente'>
        <h2>${agente}</h2>
        <img src='./img/${agente.toLowerCase()}.jpg' alt='${agente}'>
        <p><b>${agente}</b> pertenece al rol de <b>${
			agenteInfo.rol
		}</b> y su principal tarea es <b>${agenteInfo.tarea}</b></p>
    </div>
    `;
	}

	if (equipoInfo) {
		contenedorFavs.innerHTML += `
    <div class='contenedor-equipo'>
        <h2>${equipo}</h2>
        <img src='./img/equipos/${equipo.toLowerCase()}.png' alt='${equipo}'}>
        <p><b>${equipo}</b> pertenece a la region de <b>${
			equipoInfo.region
		}</b>, y en el torneo quedo en el puesto <b>${equipoInfo.puesto}</b></p>
    </div>
    `;
	}

	if (rangoInfo) {
		contenedorFavs.innerHTML += `
    <div class='contenedor-rango'>
        <h2>${rango}</h2>
        <img src='./img/rangos/${rango.toLowerCase()}.webp' alt='${rango}'}>
        <p>Estas en el rango de <b>${rango}</b>, donde se encuentra el <b>${
			rangoInfo.porcentaje
		}</b> de jugadores</p>
    </div>
    `;
	}
	mainContainer.appendChild(contenedorFavs);
};

const almacenarStorage = (info) => {
	localStorage.setItem('infoUser', JSON.stringify(info));
};

const mostrarStorage = () => {
	infoUser = JSON.parse(localStorage.getItem('infoUser')) ?? {};

	if (Object.keys(infoUser).length > 0) {
		nickForm.classList.add('hidden');
		const bienvenida = document.createElement('h2');
		bienvenida.setAttribute('id', 'bienvenida');
		bienvenida.innerHTML = infoUser?.nick
			? `Bienvenido de nuevo ${infoUser.nick}!`
			: `No hay nick ingresado`;
		mainContainer.appendChild(bienvenida);
		infoUser?.rango
			? listaFavoritos(infoUser)
			: (bienvenida.innerHTML += `<br> No hay rango seleccionado`);
		infoUser?.agente
			? listaFavoritos(infoUser)
			: (bienvenida.innerHTML += `<br> No hay agente seleccionado`);
		infoUser?.equipo
			? listaFavoritos(infoUser)
			: (bienvenida.innerHTML += `<br> No hay equipo seleccionado`);
		reIngresar();
	}
};

//Se pregunta si realmente quiere borrar la info, en caso afirmativo se eliminan los datos del localStorage
const reIngresar = () => {
	const boton = document.createElement('button');
	const h3 = document.createElement('h3');
	h3.textContent = 'Desea ingresar nueva informacion? 👇🏻';
	boton.textContent = 'Ingresar';
	boton.classList.add('btn');
	mainContainer.appendChild(h3);
	mainContainer.appendChild(boton);
	boton.addEventListener('click', () => {
		Swal.fire({
			title: 'Estas seguro?',
			text: 'No vas a poder revertirlo!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire('Borrado!', 'La informacion ha sido eliminada.', 'success');
				nickForm.classList.remove('hidden');
				localStorage.removeItem('infoUser');
				boton.remove();
				h3.remove();
				document.querySelector('#bienvenida').remove();
				document.querySelector('.contenedor-favs') &&
					document.querySelector('.contenedor-favs').remove();
			}
		});
	});
};

const mostrarVP = async (valorantPoints) => {
	const vp = await fetchApi(URL_VP);
	mainContainer.innerHTML += `<h3 class='align-left'>Elige la cantidad de VP para convertir a $ARS</h3>`;
	const { data } = vp;
	const { largeIcon } = data;
	valorantPoints.forEach(({ cantidad, precio }) => {
		vpContainer.innerHTML += `
			<div class='contenedor-vp'>
				<h2>${cantidad}</h2>
				<img src='${largeIcon}'>
				<h3>$${precio} USD</h3>
				<a href='#' class='estrella'>Seleccionar ✅</a>
			</div>
		`;
	});

	mainContainer.appendChild(vpContainer);
	const btnsSeleccionar = document.querySelectorAll('.estrella');
	btnsSeleccionar.forEach((btn) => {
		btn.addEventListener('click', (evt) => {
			seleccionarVP(evt);
		});
	});
};

const seleccionarVP = async (evt) => {
	evt.preventDefault();
	const contenedor = evt.target.parentElement;
	if (vpContainer.getElementsByClassName('seleccionado').length === 0) {
		contenedor.classList.add('seleccionado');
		document
			.querySelectorAll('.estrella')
			.forEach((el) => el.classList.add('hidden'));
		const objContenedor = {
			cantidad: contenedor.children[0].textContent,
			image: contenedor.children[1].src,
		};
		evt.target.classList.remove('hidden');
		evt.target.href = '#conversion';
		evt.target.innerHTML = 'Ver resultado';
		await mostrarSeleccionado(objContenedor);
	}
};

const mostrarSeleccionado = async ({ cantidad, image }) => {
	mainContainer.innerHTML += `
		<div id='conversion'>
		<h2>Conversion en proceso</h2>
		</div>
	`;
	let objSeleccionado = valorantPoints.find((obj) => obj.cantidad === cantidad);
	let precioFinal = await calcularPrecioPesos(objSeleccionado.precio);
	document.querySelector('#conversion').innerHTML = `
		
			<h2 >🔥Conversion finalizada🔥</h2>
			<div class='contenedor-vp'>
				<h2>${objSeleccionado.cantidad}</h2>
				<img src='${image}'>
				<p>Deberias abonar aproximadamente $${precioFinal} ARS</p>
			</div>
		
		`;
};

const calcularPrecioPesos = async (dolaresVP) => {
	let precioDolarVenta = await precioVentaOficial();
	let precioFinalPesos = dolaresVP * precioDolarVenta * IMP_ARG;
	return precioFinalPesos;
};
