import { rolesYAgentes, rangos, equiposMasters } from "./arrays.js";
import { lightMode, darkMode } from "./themeModule.js";

const mainContainer = document.querySelector('.main-container')

const contenedorAgentes = document.createElement('div');
contenedorAgentes.classList.add('grid-container');

const contenedorRango = document.createElement('div');
contenedorRango.classList.add('contenedor-rango');

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
        elegirRango(rangos);
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



const mostrarAgentes = rolesYAgentes => {
    contenedorAgentes.innerHTML = '';
    const titulo = document.createElement('h3');
    titulo.textContent = 'Elige tu agente favorito 🔥';
    titulo.classList.add('align-left');
    mainContainer.appendChild(titulo);

    const soloAgentes = rolesYAgentes.map(({ agentes }) => agentes);
    soloAgentes.forEach(agentes => {
        for (const agente of agentes) {
            const agenteInfo = rolesYAgentes.find(({ agentes }) => agentes.includes(agente));
            const { rol, tarea } = agenteInfo;
            const contenedorAgente = document.createElement('div');
            contenedorAgente.classList.add('contenedor-agente');
            const nombre = document.createElement('h2');
            const imagen = document.createElement('img');
            const parrafo = document.createElement('p');
            const estrella = document.createElement('a');

            nombre.innerHTML = agente.toUpperCase();
            imagen.setAttribute('src', `../img/${agente.toLowerCase()}.jpg`);
            imagen.setAttribute('alt', `${agente}`);
            parrafo.innerHTML = `<b>${agente}</b> pertenece al rol de <b>${rol}</b> y su principal tarea es <b>${tarea}</b>`;
            estrella.innerHTML = ' ⭐ ';
            estrella.setAttribute('href', '#');
            estrella.classList.add('estrella');
            estrella.addEventListener('click', marcarComoFavorito);

            contenedorAgente.appendChild(nombre);
            contenedorAgente.appendChild(imagen);
            contenedorAgente.appendChild(parrafo);
            contenedorAgente.appendChild(estrella);
            contenedorAgentes.appendChild(contenedorAgente);
        }
    })
    mainContainer.appendChild(contenedorAgentes);
}


const elegirRango = rangos => {
    contenedorRango.innerHTML = '';
    const label = document.createElement('label');
    label.setAttribute('for', 'rangos');
    label.textContent = 'Elije tu rango: '
    const select = document.createElement('select');
    select.setAttribute('name', 'rangos');
    select.innerHTML = `<option>Ninguno</option>`;
    contenedorRango.appendChild(label);
    for (const rango of rangos) {
        select.innerHTML += `<option value="${rango}">${rango}</option>`
    }

    select.addEventListener('change', (evt) => {
        contenedorRango.innerHTML = '';
        const h2 = document.createElement('h2');
        const rangoElegido = evt.target.value
        h2.innerHTML = `Tu rango es ${rangoElegido}`;
        contenedorRango.appendChild(h2);
        infoUser.rango = rangoElegido;
        almacenarStorage(infoUser);
        analizarRango(rangoElegido);
        mostrarEquiposMasters(equiposMasters);
    })

    contenedorRango.appendChild(select);
    mainContainer.appendChild(contenedorRango);

}


const analizarRango = rango => {
    const imagen = document.createElement('img');
    const parrafo = document.createElement('p');

    imagen.setAttribute('src', `../img/${rango.toLowerCase()}.jpg`);
    imagen.setAttribute('alt', rango);

    switch (rango) {
        case 'Hierro':
            parrafo.textContent = 'Estas en el rango mas bajo del juego, te recomiendo guias para mejorar';
            break;
        case 'Bronce':
            parrafo.textContent = 'Estas en un rango bajo, tenes que seguir practicando';
            break;
        case 'Plata':
            parrafo.textContent = 'Estas mejorando, tenes que seguir asi';
            break;
        case 'Oro':
            parrafo.textContent = 'Estas en un rango intermedio, segui practicando tu punteria';
            break;
        case 'Platino':
            parrafo.textContent = 'Estas por encima del promedio, segui asi';
            break;
        case 'Diamante':
            parrafo.textContent = 'Estas en un rango alto, tu habilidad es muy buena';
            break;
        case 'Inmortal':
            parrafo.textContent = 'Estas por llegar al rango mas alto, tenes mucha habilidad';
            break;
        case 'Radiante':
            parrafo.textContent = 'Estas en el rango mas alto del juego, podes competir profesionalmente';
            break;
        default:
            parrafo.textContent = 'Tienes que elegir un rango';
            break;
    }

    contenedorRango.appendChild(imagen);
    contenedorRango.appendChild(parrafo);

}

const mostrarEquiposMasters = equipos => {
    contenedorEquipos.innerHTML = '';
    const titulo = document.createElement('h3');
    titulo.textContent = 'Elige tu equipo favorito de la Masters de Reykjavik';
    titulo.classList.add('align-left');
    mainContainer.appendChild(titulo);
    equipos.forEach(({ nombre, region, puesto }) => {
        const contenedorEquipo = document.createElement('div');
        contenedorEquipo.classList.add('contenedor-equipo');
        const h2 = document.createElement('h2');
        const imagen = document.createElement('img');
        const parrafo = document.createElement('p');
        const estrella = document.createElement('a');

        h2.innerHTML = `${nombre.toUpperCase()}`;
        imagen.setAttribute('src', `../img/equipos/${nombre.toLowerCase()}.png`);
        imagen.setAttribute('alt', `${nombre}`);
        parrafo.innerHTML = `<b>${nombre}</b> pertenece a la region de <b>${region}</b>, y en el torneo quedo en el puesto <b>${puesto}</b>`;
        estrella.setAttribute('href', '#');
        estrella.innerHTML = `⭐`;
        estrella.classList.add('estrella');
        estrella.addEventListener('click', marcarComoFavorito)

        contenedorEquipo.appendChild(h2);
        contenedorEquipo.appendChild(imagen);
        contenedorEquipo.appendChild(parrafo);
        contenedorEquipo.appendChild(estrella);
        contenedorEquipos.appendChild(contenedorEquipo);
    });
    mainContainer.appendChild(contenedorEquipos);
}

const marcarComoFavorito = evt => {
    evt.preventDefault();
    const contenedor = evt.target.parentElement;
    if (contenedor.classList.contains('contenedor-agente') && contenedorAgentes.getElementsByClassName('favorito').length === 0) {
        contenedor.classList.add('favorito');
        infoUser.agente = contenedor.firstElementChild.textContent;
    } else if (contenedor.classList.contains('contenedor-equipo') && contenedorEquipos.getElementsByClassName('favorito').length === 0) {
        contenedor.classList.add('favorito');
        infoUser.equipo = contenedor.firstElementChild.textContent;
        listaFavoritos(infoUser);
    } else {
        contenedor.classList.remove('favorito');
    }

    almacenarStorage(infoUser);
}

const listaFavoritos = ({ agente, equipo }) => {
    contenedorFavs.innerHTML = '';
    contenedorFavs.classList.add('contenedor-favs');

    const agenteInfo = rolesYAgentes.find(({ agentes }) => agentes.some(item => item.toUpperCase() == agente));
    const equipoInfo = equiposMasters.find(({ nombre }) => nombre.toUpperCase() == equipo);

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

    contenedorRango.children.length && (contenedorFavs.innerHTML += contenedorRango.outerHTML);
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
        infoUser?.rango ? analizarRango(infoUser.rango) : bienvenida.innerHTML += `<br> No hay rango seleccionado`;
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










