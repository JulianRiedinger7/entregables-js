
const rolesYAgentes = [
    {
        rol: "iniciador",
        agentes: ["Sova", "Kayo", "Skye", "Breach", "Fade"],
        tarea: "Apoyar al equipo con informacion sobre los enemigos"
    },
    {
        rol: "controlador",
        agentes: ["Brimstone", "Omen", "Astra", "Viper"],
        tarea: "Ayudar al equipo tapando zonas peligrosas con sus humos"
    },
    {
        rol: "duelista",
        agentes: ["Jett", "Reyna", "Yoru", "Phoenix", "Raze", "Neon"],
        tarea: "Ser el primero en ingresar a la accion con sus habilidades de movimiento"
    },
    {
        rol: "centinela",
        agentes: ["Killjoy", "Cypher", "Sage", "Chamber"],
        tarea: "Vigilar los flancos y ralentizar a los enemigos con sus habilidades"
    },
]

const rangos = ["Hierro", "Bronce", "Plata", "Oro", "Platino", "Diamante", "Inmortal", "Radiante"];

const mainContainer = document.querySelector('.main-container')

const contenedorAgente = document.createElement('div');
contenedorAgente.classList.add('contenedor-agente')

const contenedorRango = document.createElement('div');
contenedorRango.classList.add('contenedor-rango');

const nickForm = document.querySelector('#formulario');

let infoUser = {};

//Recupera los datos del input text escuchando el evento submit del form, generando una bienvenida.
const darBienvenida = evt => {
    evt.preventDefault();


    const hijosForm = evt.target.children;

    if (hijosForm[1].value === '') {
        mensajeError();
        return;
    }



    const h2 = document.createElement('h2');
    h2.innerHTML = `Hola ${hijosForm[1].value.toUpperCase()}, espero estes muy bien!`;

    mainContainer.appendChild(h2);
    infoUser.nick = hijosForm[1].value.toUpperCase();
    nickForm.reset();
    elegirAgenteFavorito(rolesYAgentes);
}

const mensajeError = () => {
    const p = document.createElement('p');
    p.textContent = 'NO SE PUEDE INGRESAR UN NICK VACIO';
    p.classList.add('error');
    mainContainer.prepend(p);

    setTimeout(() => {
        p.remove();
    }, 2500);
}

nickForm.addEventListener('submit', darBienvenida);



//Crea un select con cada uno de los agentes del array rolesYAgentes para que el usuario elija su favorito
const elegirAgenteFavorito = rolYagentes => {
    const label = document.createElement('label');
    label.setAttribute('for', 'agentes');
    label.textContent = "Elije tu agente favorito: "
    const select = document.createElement('select');
    select.setAttribute('name', 'agentes');
    select.innerHTML = `<option>Ninguno</option>`;
    contenedorAgente.appendChild(label);

    const soloAgentes = rolYagentes.map(objeto => objeto.agentes);
    soloAgentes.forEach(agentes => {
        for (const agente of agentes) {
            select.innerHTML += `<option value="${agente}">${agente}</option>`
        }
    });

    contenedorAgente.appendChild(select);

    select.addEventListener('change', (e) => {
        contenedorAgente.innerHTML = ''
        const h2 = document.createElement('h2');
        const elegido = e.target.value;
        h2.innerHTML = `Tu agente favorito es ${elegido}`;
        contenedorAgente.appendChild(h2);
        analizarAgente(elegido);
    })

    mainContainer.appendChild(contenedorAgente);

}

//Analiza el agente elegido con el select, brindando una imagen, su rol y la tarea
const analizarAgente = agente => {
    const imagen = document.createElement('img');
    const parrafo = document.createElement('p');

    console.log(agente);

    const agenteInfo = rolesYAgentes.find(objeto => objeto.agentes.includes(agente));
    console.log(agenteInfo);

    imagen.setAttribute('src', `./img/${agente.toLowerCase()}.jpg`);
    parrafo.innerHTML = `<b>${agente.toUpperCase()}</b> pertenece al rol de <b>${agenteInfo.rol.toUpperCase()}</b> y su principal tarea es ${agenteInfo.tarea}`;

    contenedorAgente.appendChild(imagen);
    contenedorAgente.appendChild(parrafo);
    elegirRango(rangos);
}


const elegirRango = rangos => {
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

    select.addEventListener('change', (e) => {
        contenedorRango.innerHTML = '';
        const h2 = document.createElement('h2');
        h2.innerHTML = `Tu rango es ${e.target.value}`;
        contenedorRango.appendChild(h2);
        analizarRango(e.target.value);
    })

    contenedorRango.appendChild(select);
    mainContainer.appendChild(contenedorRango)
}


const analizarRango = rango => {
    const imagen = document.createElement('img');
    const parrafo = document.createElement('p');

    imagen.setAttribute('src', `./img/${rango.toLowerCase()}.jpg`);

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



/* //Comprueba si el equipo participo o no de la ultima Masters, si participo dice su puesto y region
const analizarEquipo = user => {
    const equiposMasters = [
        {nombre: 'Optic', puesto: 'Campeon', region: 'Norteamerica'},
        {nombre: 'Loud', puesto: 'Subcampeon', region: 'Brasil'},
        {nombre: 'Zeta Division', puesto: 'Tercero', region: 'Japon'},
        {nombre: 'Paper Rex', puesto: 'Cuarto', region: 'Singapur'},
        {nombre: 'G2', puesto: 'Quinto/Sexto', region: 'Europa'},
        {nombre: 'DRX', puesto: 'Quinto/Sexto', region: 'Coreal del Sur'},
        {nombre: 'The Guard', puesto: 'Septimo/Octavo', region: 'Norteamerica'},
        {nombre: 'Liquid', puesto: 'Septimo/Octavo', region: 'Europa'},
        {nombre: 'Fpx', puesto: 'Octavo', region: 'Europa'},
        {nombre: 'Nip', puesto: 'Noveno/Decimo', region: 'Brasil'},
        {nombre: 'Xerxia', puesto: 'Noveno/Decimo', region: 'Tailandia'},
        {nombre: 'Fnatic', puesto: 'Onceavo/Doceavo', region: 'Europa'},
        {nombre: 'Kru', puesto: 'Onceavo/Doceavo', region: 'Latinoamerica'}
    ]
    let userTeam = equiposMasters.filter(equipo => equipo.nombre.toLowerCase() === user.equipoFav.toLowerCase());
    if(userTeam.length > 0){
        parrafo.innerHTML += `Tu equipo favorito es <b>${userTeam[0].nombre.toUpperCase()}</b> y clasifico a la ultima Masters en Reykjavik! <br> La region del equipo es <b>${userTeam[0].region.toUpperCase()}</b> y su puesto en el torneo fue de <b>${userTeam[0].puesto.toUpperCase()}</b>!`
    } else parrafo.innerHTML += `Tu equipo favorito es <b>${user.equipoFav.toUpperCase()}</b>, y lametablemente no clasifico a la ultima Masters en Reykjavik 😢`
} */