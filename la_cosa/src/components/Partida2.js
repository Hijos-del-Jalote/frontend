import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/Partida.css";

function Partida() {
  const [partida, setPartida] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idPartida = queryParams.get("idPartida");

  useEffect(() => {
    // Hacer una solicitud GET a http://localhost:8000/partidas/{idPartida} cuando el componente se monte
    axios
      .get(`http://localhost:8000/partidas/${idPartida}`)
      .then((response) => {
        setPartida(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la partida:", error);
      });
  }, [idPartida]);

  if (!partida) {
    return <div>Cargando...</div>;
  }

  // Variables locales para acceder a los datos más fácilmente
  const {
    nombre,
    maxJugadores,
    minJugadores,
    iniciada,
    turnoActual,
    sentido,
    jugadores,
  } = partida;

  return (
    <div className="contenedorPrincipal">
      <h1>{nombre}</h1>
      <div className="contenedorJugadores">
        <h3>Oponentes:</h3>
        <ul className="listaJugadores">
          {jugadores.map((jugador) => (
            <li key={jugador.id}>
              <div className="contenedorJugador">
              <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745" alt="Imagen del jugador" style={{ width: '100px' }}/>
                <p>{jugador.nombre}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="contenedor_mazo_y_descartes">
        <div className="contenedorMazo">
          <h5>Mazo</h5>
          <img src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png" alt="Mazo de cartas" style={{ width: '75px' }}/>
        </div>
        <div className="contenedorDescartes">
          <h5>Pila de Descartes</h5>
          <img src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png" alt="Mazo de cartas" style={{ width: '75px' }}/>
        </div>
      </div>
      <div className="contenedorManoJugador">
        {/* Mostrar la mano del jugador actual */}
        <h3>Tu Mano</h3>
      </div>
      <div className="contenedorInfo">
        {/* Mostrar información adicional de la partida */}
        <h4>Información de la Partida</h4>
        <p>Max Jugadores: {maxJugadores}</p>
        <p>Min Jugadores: {minJugadores}</p>
        <p>Iniciada: {iniciada ? "Sí" : "No"}</p>
        <p>Turno Actual: {turnoActual || "Ninguno"}</p>
        <p>Sentido: {sentido ? "Horario" : "Antihorario"}</p>
      </div>
    </div>
  );
}

export default Partida;
