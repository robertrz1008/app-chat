interface Persona{
    id?: number
    nombre: string,
    edad?: number,
}

interface Identidad extends Persona{
    estado?: boolean,
    nacinalidad?: string
}

const jugador: Identidad = {
    nombre: "Raul",
}

console.log(jugador)