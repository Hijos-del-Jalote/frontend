export default function Partida() {
    // Supongo que el backend me envía el listado de oponentes en un arreglo.
    const jugadores = [
      { nombre: "nombre1" },
      { nombre: "nombre2" },
      { nombre: "nombre3" },
      { nombre: "nombre4" }
    ];
  
    // Supongo que el backend me envía la mano del jugador en un arreglo.
    const cartas = [
      { type: "vacia" },
      { type: "lanzallamas" },
      { type: "vacia" },
      { type: "lanzallamas" }
    ];
  
    return (
      <>
        <div>
          <h2>Listado de Oponentes:</h2>
          {jugadores.map((jugador, index) => (
            <div key={index}>
              {jugador.nombre}
            </div>
          ))}
        </div>
        <div>
          <h2>Mano del Jugador:</h2>
          {cartas.map((carta, index) => (
            <div key={index}>
              <button>{carta.type}</button>
            </div>
          ))}
        </div>
      </>
    );
  }