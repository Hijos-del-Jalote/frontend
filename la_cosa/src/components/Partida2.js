import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
  const { nombre, maxJugadores, minJugadores, iniciada, turnoActual, sentido, jugadores } = partida;

  return (
    <div className="container text-center">
      <h2 className="mt-5">{nombre}</h2>
      <div className="row">
        <div className="col-md-6">
          {/* Mostrar la lista de jugadores */}
          <h3>Jugadores:</h3>
          <ul>
            {jugadores.map((jugador) => (
              <li key={jugador.id}>{jugador.nombre}</li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          {/* Mostrar el mazo y la pila de descarte */}
          <h3>Mazo</h3>
          {/* Aquí puedes mostrar el mazo de cartas */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {/* Mostrar la mano del jugador actual */}
          <h3>Tu Mano</h3>
          {/* Aquí puedes mostrar la mano del jugador */}
        </div>
        <div className="col-md-6">
          {/* Mostrar información adicional de la partida */}
          <h3>Información de la Partida</h3>
          <p>Max Jugadores: {maxJugadores}</p>
          <p>Min Jugadores: {minJugadores}</p>
          <p>Iniciada: {iniciada ? "Sí" : "No"}</p>
          <p>Turno Actual: {turnoActual || "Ninguno"}</p>
          <p>Sentido: {sentido ? "Horario" : "Antihorario"}</p>
        </div>
      </div>
    </div>
  );
}

export default Partida;
