import { rolesYAgentes, rangos, equiposMasters } from "./arrays.js";
import { lightMode, darkMode } from "./themeModule.js";

const mainContainer = document.querySelector('.main-container')

const contenedorAgentes = document.createElement('div');
contenedorAgentes.classList.add('grid-container');

const contenedorRangos = document.createElement('div');
contenedorRangos.classList.add('grid-container');
contenedorRangos.setAttribute('id', 'contenedor-rangos');

const contenedorEquipos = document.createElement('div');
contenedorEquipos.classList.add('grid-container');

const contenedorFavs = document.createElement('div');

const nickForm = document.querySelector('#formulario');

let infoUser = {};

const btnTheme = document.querySelector('#btn-theme');

btnTheme.addEventListener('click', () => {
    localStorage.getItem('theme') === 'light' ? darkMode() : lightMode();
})

document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('theme') === 'light' ? lightMode() : darkMode();
    mostrarStorage();
})

//Recupera los datos del input text escuchando el evento submit del form, generando una bienvenida.
const darBienvenida = evt => {
    evt.preventDefault();
    const userNick = evt.target.children[1].value;

    if (userNick === '') {
        mensajeError('NO SE PUEDE INGRESAR UN NICK VACIO');
        return;
    } else if (userNick.length > 20) {
        mensajeError('EL NICK ES DEMASIADO LARGO');
        nickForm.reset();
        return;
    } else {
        nickForm.classList.add('hidden');
        const h2 = document.createElement('h2');
        h2.innerHTML = `Hola ${userNick.toUpperCase()}, espero estes muy bien!`;

        mainContainer.appendChild(h2);
        infoUser.nick = userNick.toUpperCase();
        nickForm.reset();
        mostrarAgentes(rolesYAgentes)
        mostrarRangos(rangos);
        mostrarEquiposMasters(equiposMasters);
    }
}

const mensajeError = msg => {
    const p = document.createElement('p');
    p.textContent = msg;
    p.classList.add('error');
    mainContainer.prepend(p);

    setTimeout(() => {
        p.remove();
    }, 2500);
}

nickForm.addEventListener('submit', darBienvenida);


const crearCard = () => {
    const titulo = document.createElement('h2');
    const imagen = document.createElement('img');
    const estrella = document.createElement('a');

    estrella.setAttribute('href', '');
    estrella.innerHTML = 'Agregar ⭐ ';
    estrella.classList.add('estrella');
    estrella.addEventListener('click', marcarComoFavorito);

    return {
        titulo,
        imagen,
        estrella
    }
}


const mostrarAgentes = rolesYAgentes => {
    contenedorAgentes.innerHTML = '';
    const titulo = document.createElement('h3');
    titulo.textContent = 'Elige tu agente favorito 🔥';
    titulo.classList.add('align-left');
    mainContainer.appendChild(titulo);

    const soloAgentes = rolesYAgentes.map(({ agentes }) => agentes).flat();
    soloAgentes.forEach(agente => {
        const contenedorAgente = document.createElement('div');
        contenedorAgente.classList.add('contenedor-agente');
        const objCard = crearCard();

        objCard.titulo.innerHTML = agente.toUpperCase();
        objCard.imagen.setAttribute('src', `../img/${agente.toLowerCase()}.jpg`);
        objCard.imagen.setAttribute('alt', `${agente}`);



        contenedorAgente.appendChild(objCard.titulo);
        contenedorAgente.appendChild(objCard.imagen);
        contenedorAgente.appendChild(objCard.estrella);
        contenedorAgentes.appendChild(contenedorAgente);
    })
    mainContainer.appendChild(contenedorAgentes);
}


const mostrarRangos = rangos => {
    contenedorRangos.innerHTML = '';
    const h3 = document.createElement('h3');
    h3.textContent = 'Selecciona tu rango ';
    h3.classList.add('align-left');
    mainContainer.appendChild(h3);
    rangos.forEach(({ nombre }) => {
        const contenedorRango = document.createElement('div');
        contenedorRango.classList.add('contenedor-rango');
        const objCard = crearCard();

        objCard.titulo.innerHTML = `${nombre.toUpperCase()}`;
        objCard.imagen.setAttribute('src', `../img/rangos/${nombre.toLowerCase()}.webp`);
        objCard.imagen.setAttribute('alt', `${nombre}`);

        contenedorRango.appendChild(objCard.titulo);
        contenedorRango.appendChild(objCard.imagen);
        contenedorRango.appendChild(objCard.estrella);
        contenedorRangos.appendChild(contenedorRango);

    })
    mainContainer.appendChild(contenedorRangos);
}

const mostrarEquiposMasters = equipos => {
    contenedorEquipos.innerHTML = '';
    const titulo = document.createElement('h3');
    titulo.textContent = 'Elige tu equipo favorito de la Masters de Reykjavik';
    titulo.classList.add('align-left');
    mainContainer.appendChild(titulo);
    equipos.forEach(({ nombre }) => {
        const contenedorEquipo = document.createElement('div');
        contenedorEquipo.classList.add('contenedor-equipo');
        const objCard = crearCard();

        objCard.titulo.innerHTML = `${nombre.toUpperCase()}`;
        objCard.imagen.setAttribute('src', `../img/equipos/${nombre.toLowerCase()}.png`);
        objCard.imagen.setAttribute('alt', `${nombre}`);

        contenedorEquipo.appendChild(objCard.titulo);
        contenedorEquipo.appendChild(objCard.imagen);
        contenedorEquipo.appendChild(objCard.estrella);
        contenedorEquipos.appendChild(contenedorEquipo);
    });
    mainContainer.appendChild(contenedorEquipos);
}

const marcarComoFavorito = evt => {
    evt.preventDefault();
    const contenedor = evt.target.parentElement;
    if (contenedor.classList.contains('contenedor-agente') && contenedorAgentes.getElementsByClassName('favorito').length === 0) {
        contenedor.classList.add('favorito');
        contenedor.getElementsByClassName('estrella')[0].innerHTML = `Quitar ❌`;
        infoUser.agente = contenedor.firstElementChild.textContent;
    } else if (contenedor.classList.contains('contenedor-rango') && contenedorRangos.getElementsByClassName('favorito').length === 0) {
        contenedor.classList.add('favorito');
        contenedor.getElementsByClassName('estrella')[0].innerHTML = `Quitar ❌`;
        infoUser.rango = contenedor.firstElementChild.textContent;
        listaFavoritos(infoUser);
    } else if (contenedor.classList.contains('contenedor-equipo') && contenedorEquipos.getElementsByClassName('favorito').length === 0) {
        contenedor.classList.add('favorito');
        contenedor.getElementsByClassName('estrella')[0].innerHTML = `Quitar ❌`;
        infoUser.equipo = contenedor.firstElementChild.textContent;
        listaFavoritos(infoUser);
    } else {
        contenedor.classList.remove('favorito');
        contenedor.getElementsByClassName('estrella')[0].innerHTML = `Agregar ⭐`;
    }

    almacenarStorage(infoUser);
}

const listaFavoritos = ({ agente, rango, equipo }) => {
    contenedorFavs.innerHTML = '';
    contenedorFavs.classList.add('contenedor-favs');

    const agenteInfo = rolesYAgentes.find(({ agentes }) => agentes.some(item => item.toUpperCase() == agente));
    const equipoInfo = equiposMasters.find(({ nombre }) => nombre.toUpperCase() == equipo);
    const rangoInfo = rangos.find(({ nombre }) => nombre.toUpperCase() === rango)

    if (agenteInfo) {
        contenedorFavs.innerHTML = `
    <h2>🔥 Tus Favoritos 🔥</h2>
    <div class='contenedor-agente'>
        <h2>${agente}</h2>
        <img src='../img/${agente.toLowerCase()}.jpg' alt='${agente}'>
        <p><b>${agente}</b> pertenece al rol de <b>${agenteInfo.rol}</b> y su principal tarea es <b>${agenteInfo.tarea}</b></p>
    </div>
    `;
    }


    if (equipoInfo) {
        contenedorFavs.innerHTML += `
    <div class='contenedor-equipo'>
        <h2>${equipo}</h2>
        <img src='../img/equipos/${equipo.toLowerCase()}.png' alt='${equipo}'}>
        <p><b>${equipo}</b> pertenece a la region de <b>${equipoInfo.region}</b>, y en el torneo quedo en el puesto <b>${equipoInfo.puesto}</b></p>
    </div>
    `;
    }

    if (rangoInfo) {
        contenedorFavs.innerHTML += `
    <div class='contenedor-rango'>
        <h2>${rango}</h2>
        <img src='../img/rangos/${rango.toLowerCase()}.webp' alt='${rango}'}>
        <p>Estas en el rango de <b>${rango}</b>, donde se encuentra el <b>${rangoInfo.porcentaje}</b> de jugadores</p>
    </div>
    `;
    }
    mainContainer.appendChild(contenedorFavs);

}

const almacenarStorage = info => {
    localStorage.setItem('infoUser', JSON.stringify(info));
}

const mostrarStorage = () => {
    infoUser = JSON.parse(localStorage.getItem('infoUser')) ?? {};

    if (Object.keys(infoUser).length > 0) {
        nickForm.classList.add('hidden');
        const bienvenida = document.createElement('h2');
        bienvenida.setAttribute('id', 'bienvenida');
        bienvenida.innerHTML = infoUser?.nick ? `Hola ${infoUser.nick}, espero estes muy bien!` : `No hay nick ingresado`;
        mainContainer.appendChild(bienvenida);
        infoUser?.rango ? listaFavoritos(infoUser) : bienvenida.innerHTML += `<br> No hay rango seleccionado`;
        infoUser?.agente ? listaFavoritos(infoUser) : bienvenida.innerHTML += `<br> No hay agente seleccionado`;
        infoUser?.equipo ? listaFavoritos(infoUser) : bienvenida.innerHTML += `<br> No hay equipo seleccionado`;
        reIngresar();
    }
}

const reIngresar = () => {
    const boton = document.createElement('button');
    const h3 = document.createElement('h3');
    h3.textContent = 'Desea ingresar nueva informacion? 👇🏻'
    boton.textContent = 'Ingresar';
    mainContainer.appendChild(h3);
    mainContainer.appendChild(boton);
    boton.addEventListener('click', () => {
        nickForm.classList.remove('hidden');
        localStorage.removeItem('infoUser');
        boton.remove();
        h3.remove();
        document.querySelector('#bienvenida').remove();
        document.querySelector('.contenedor-favs') && document.querySelector('.contenedor-favs').remove();
    })
}










