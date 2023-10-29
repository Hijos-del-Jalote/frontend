class Partida {
  constructor(
    id,
    nombre,
    password,
    maxJug,
    minJug,
    turnoActual,
    sentido,
    iniciada,
    finalizada,
    jugadores,
    cartas
  ) {
    this.id = id;
    this.nombre = nombre;
    this.password = password || ""; // Si no se proporciona, establece un valor predeterminado
    this.maxJug = maxJug;
    this.minJug = minJug;
    this.turnoActual = turnoActual || null; // Si no se proporciona, establece null
    this.sentido = sentido === undefined ? true : sentido; // Si no se proporciona, establece true
    this.iniciada = iniciada === undefined ? false : iniciada; // Si no se proporciona, establece false
    this.finalizada = finalizada === undefined ? false : finalizada; // Si no se proporciona, establece false
    this.jugadores = jugadores || new Set();
    this.cartas = cartas || new Set();
  }
}


export default Partida;