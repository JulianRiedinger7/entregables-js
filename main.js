
class UsuarioValorant{
    constructor(agente,rango,equipo,nombre){
        this.agenteFav = agente;
        this.rango = rango;
        this.equipoFav = equipo;
        this.nick = nombre;
        this.nickCambiado = false;
    }

    cambiarNick(){
        if(!this.nickCambiado){
            let nuevoNick = prompt("Ingresa tu nuevo nombre en Valorant");
            this.nick = nuevoNick;
            this.nickCambiado = true;
        } else alert("Solo puedes cambiar tu nombre una vez cada 30 dias.");
    }

}


const rolesYAgentes = [
    {
        rol: "iniciador",
        agentes: ["Sova","Kayo","Skye","Breach","Fade"],
        tarea: "Apoyar al equipo con informacion sobre los enemigos"
    },
    {
        rol: "controlador",
        agentes: ["Brimstone","Omen","Astra","Viper"],
        tarea: "Ayudar al equipo tapando zonas peligrosas con sus humos"
    },
    {
        rol: "duelista",
        agentes: ["Jett","Reyna","Yoru","Phoenix","Raze","Neon"],
        tarea: "Ser el primero en ingresar a la accion con sus habilidades de movimiento"
    },
    {
        rol: "centinela",
        agentes: ["Killjoy","Cypher","Sage","Chamber"],
        tarea: "Vigilar los flancos y ralentizar a los enemigos con sus habilidades"
    },
]

let contenedor = document.querySelector('.contenedor');
let parrafo = document.createElement('p');
let h2 = document.createElement('h2');
let imagen = document.createElement('img');

/* contenedor.appendChild(imagen); */

const elegirAgenteFavorito = rolYagentes =>{
    const soloAgentes = rolYagentes.map(objeto => objeto.agentes);
    
    const select = document.createElement('select');
    soloAgentes.forEach(agentes => {
        for(const agente of agentes){
            select.innerHTML += `<option id="${agentes.indexOf(agente)}">${agente}</option>`
        }
    });
    document.body.appendChild(select);
}
elegirAgenteFavorito(rolesYAgentes);

/* //Comprueba que el nombre del usuario no sea demasiado largo y genera un saludo
const saludarUsuario = user => {
    while(user.nick == "" || user.nick.length >= 20){
        user.nick = prompt("Ingrese un nick valido");
    }
    h2.innerHTML = `<h2>Hola <b>${user.nick.toUpperCase()}</b>, espero estes muy bien!</h2>`;
    h2.style.color = 'red';
    contenedor.appendChild(h2);
    analizarRango(user);
}

//Comprueba si es valido y dentro de que rango se encuentra el usuario y añade una descripcion
const analizarRango = user => {
    const rangos = ["hierro","bronce","plata","oro","platino","diamante","inmortal","radiante"];
    user.rango = user.rango.toLowerCase();
    while(rangos.indexOf(user.rango) == -1){
        user.rango = prompt("Ingrese un rango valido");
    }
    if(rangos.indexOf(user.rango) > 3 && rangos.indexOf(user.rango) < 7){
        parrafo.innerHTML = `Estas en un rango de <b>${user.rango.toUpperCase()}</b>, lo cual demuestra que tenes gran habilidad! <br>`;
    }else if(rangos.indexOf(user.rango) == 7){
        parrafo.innerHTML = `Estas en un rango de <b>${user.rango.toUpperCase()}</b>, el mas alto del juego! <br>`;
    }else parrafo.innerHTML = `Estas en un rango de <b>${user.rango.toUpperCase()}</b>, te recomiendo guias de youtube para mejorar! <br>`;
    analizarAgente(user);
}


//Comprueba si el agente existe, si existe añade una imagen del agente con la descripcion del rol y tarea
const analizarAgente = user => {

    let userArray = rolesYAgentes
    .filter(objeto => objeto.agentes.includes(user.agenteFav.toLowerCase()))
    .map(objeto => ({rol: objeto.rol, tarea: objeto.tarea}));
    while(userArray.length === 0){
        user.agenteFav = prompt("Ingrese un agente valido");
        userArray = rolesYAgentes
        .filter(objeto => objeto.agentes.includes(user.agenteFav.toLowerCase()))
        .map(objeto => ({rol: objeto.rol, tarea: objeto.tarea}));
    }


    imagen.setAttribute('src',`./img/${user.agenteFav.toLowerCase()}.jpg`);
    imagen.setAttribute('alt',`./img/${user.agenteFav.toLowerCase()}`);
    


    parrafo.innerHTML += `Tu agente favorito es <b>${user.agenteFav.toUpperCase()}</b>, el cual pertenece al rol de <b>${userArray[0].rol.toUpperCase()}</b> <br> La tarea principal es <b>${userArray[0].tarea}</b> <br>`;

    
    analizarEquipo(user);
}


//Comprueba si el equipo participo o no de la ultima Masters, si participo dice su puesto y region
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
}


saludarUsuario(user);
contenedor.appendChild(parrafo); */