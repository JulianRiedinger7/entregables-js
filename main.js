

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

const saludarUsuario = user => {
    while(user.nick == ""){
        user.nick = prompt("Ingrese un nick valido");
    }
    resultado.innerHTML += `Hola <b>${user.nick.toUpperCase()}</b>, espero estes muy bien! <br>`;
    analizarRango(user);
}


const analizarRango = user => {
    const rangos = ["hierro","bronce","plata","oro","platino","diamante","inmortal","radiante"];
    user.rango = user.rango.toLowerCase();
    while(rangos.indexOf(user.rango) == -1){
        user.rango = prompt("Ingrese un rango valido");
    }
    if(rangos.indexOf(user.rango) > 3 && rangos.indexOf(user.rango) < 7){
        resultado.innerHTML += `Estas en un rango de <b>${user.rango.toUpperCase()}</b>, lo cual demuestra que tenes gran habilidad! <br>`;
    }else if(rangos.indexOf(user.rango) == 7){
        resultado.innerHTML += `Estas en un rango de <b>${user.rango.toUpperCase()}</b>, el mas alto del juego! <br>`;
    }else resultado.innerHTML += `Estas en un rango de <b>${user.rango.toUpperCase()}</b>, te recomiendo guias de youtube para mejorar! <br>`;
    analizarAgente(user);
}

const analizarAgente = user => {
    const agentes = {
        iniciador: ["sova","kayo","skye","breach"],
        controlador: ["brimstone","omen","astra","viper"],
        duelista: ["jett","reyna","yoru","phoenix","raze","neon"],
        centinela: ["killjoy","cypher","sage","chamber"]
    }
    user.agenteFav = user.agenteFav.toLowerCase();

    while(!agentes.iniciador.includes(user.agenteFav) && !agentes.controlador.includes(user.agenteFav) 
    && !agentes.duelista.includes(user.agenteFav) && !agentes.centinela.includes(user.agenteFav)){
        user.agenteFav = prompt("Ingrese un agente valido");
    }

    for(const agente in agentes){
        if(agentes[agente].includes(user.agenteFav)){
            resultado.innerHTML += `Tu agente favorito es <b>${user.agenteFav.toUpperCase()}</b>, entonces te gusta jugar el rol de <b>${agente.toUpperCase()}</b>! <br>`;
            break;
        }
    }
    
    analizarEquipo(user);
}

const analizarEquipo = user => {
    const equiposMasters = ["g2","liquid","fnatic","zeta division","nip","loud","optic","guard","paper rex","kru","xerxia","drx"];
    user.equipoFav = user.equipoFav.toLowerCase();
    while(user.equipoFav == ""){
        user.equipoFav = prompt("Ingrese un equipo valido");
    }
    if(equiposMasters.includes(user.equipoFav)){
        resultado.innerHTML += `Tu equipo favorito <b>${user.equipoFav.toUpperCase()}</b> clasifico a la ultima Masters en Reykjavik! <br>`;
    } else {
        resultado.innerHTML += `Tu equipo favorito <b>${user.equipoFav.toUpperCase()}</b> no se encuentra en la ultima Masters!`;
    }
}

saludarUsuario(user);