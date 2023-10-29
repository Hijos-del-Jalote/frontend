import Carta from "./Carta";

class Jugador {
  constructor(
    id,
    nombre,
    isHost,
    posicion,
    isAlive,
    blockIzq,
    blockDer,
    rol,
    cartas
  ) {
    this.id = id;
    this.nombre = nombre;
    this.isHost = isHost;
    this.posicion = posicion;
    this.isAlive = isAlive;
    this.blockIzq = blockIzq;
    this.blockDer = blockDer;
    this.rol = rol;
    this.cartas = cartas.map(
      (carta) =>
        new Carta(carta.id, carta.nombre, carta.descripcion, carta.tipo)
    );
  }
}




  export default Jugador;