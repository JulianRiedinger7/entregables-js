
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

const user = new UsuarioValorant(
    prompt("Ingresa tu agente favorito"),
    prompt("Ingresa tu rango, sin especificar division"),
    prompt("Ingresa tu equipo favorito"),
    prompt("Ingresa tu nick en el juego")
);

//Esta declaracion de abajo reemplazaria a la clase, cual es mejor? Entiendo que funcionan de la misma manera
/* const user = {
    agenteFav: prompt("Ingresa tu agente favorito: "),
    rango: prompt("Ingresa tu rango, sin especificar division"),
    equipoFav: prompt("Ingresa tu equipo favorito"),
    nick: prompt("Ingresa tu nick en el juego")
} */

let contenedor = document.querySelector('.contenedor');
let parrafo = document.createElement('p');
let h2 = document.createElement('h2');

const saludarUsuario = user => {
    while(user.nick == "" || user.nick.length >= 20){
        user.nick = prompt("Ingrese un nick valido");
    }
    h2.innerHTML = `<h2>Hola <b>${user.nick.toUpperCase()}</b>, espero estes muy bien!</h2>`;
    h2.style.color = 'red';
    contenedor.appendChild(h2);
    analizarRango(user);
}


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

const analizarAgente = user => {

    const rolesYAgentes = [
        {
            rol: "iniciador",
            agentes: ["sova","kayo","skye","breach","fade"],
            tarea: "Apoyar al equipo con informacion sobre los enemigos"
        },
        {
            rol: "controlador",
            agentes: ["brimstone","omen","astra","viper"],
            tarea: "Ayudar al equipo tapando zonas peligrosas con sus humos"
        },
        {
            rol: "duelista",
            agentes: ["jett","reyna","yoru","phoenix","raze","neon"],
            tarea: "Ser el primero en ingresar a la accion con sus habilidades de movimiento"
        },
        {
            rol: "centinela",
            agentes: ["killjoy","cypher","sage","chamber"],
            tarea: "Vigilar los flancos y ralentizar a los enemigos con sus habilidades"
        },
    ]

    let userArray = rolesYAgentes
    .filter(objeto => objeto.agentes.includes(user.agenteFav.toLowerCase()))
    .map(objeto => ({rol: objeto.rol, tarea: objeto.tarea}));
    while(userArray.length === 0){
        user.agenteFav = prompt("Ingrese un agente valido");
        userArray = rolesYAgentes
        .filter(objeto => objeto.agentes.includes(user.agenteFav.toLowerCase()))
        .map(objeto => ({rol: objeto.rol, tarea: objeto.tarea}));
    }

    parrafo.innerHTML += `Tu agente favorito es <b>${user.agenteFav.toUpperCase()}</b>, el cual pertenece al rol de <b>${userArray[0].rol.toUpperCase()}</b> <br> La tarea principal es <b>${userArray[0].tarea}</b> <br>`;

    
    analizarEquipo(user);
}

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
console.log(parrafo);


saludarUsuario(user);
contenedor.appendChild(parrafo);