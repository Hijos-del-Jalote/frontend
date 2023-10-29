class JugadorPartida {
  constructor(id, nombre, posicion, isAlive, rol) {
    this.id = id;
    this.nombre = nombre;
    this.posicion = posicion;
    this.isAlive = isAlive;
    this.rol = rol;
  }
}

class Partida {
  constructor(id, nombre, maxJug, minJug, iniciada, turnoActual, sentido, jugadores) {
    this.id = id;
    this.nombre = nombre;
    this.maxJug = maxJug;
    this.minJug = minJug;
    this.iniciada = iniciada === undefined ? false : iniciada;
    this.turnoActual = turnoActual || null;
    this.sentido = sentido === undefined ? true : sentido;
    this.jugadores = jugadores ? jugadores.map(playerData => new JugadorPartida(playerData.id, playerData.nombre, playerData.posicion, playerData.isAlive, playerData.rol)) : [];
  }
}

export default Partida;
