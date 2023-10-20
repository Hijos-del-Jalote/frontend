import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import InfoPartida from "./InfoPartida";
import PartidaEnCurso from "./PartidaEnCurso";
import { useWebSocket } from "./WebSocketContext";

function Partida() {
  const [partida, setPartida] = useState(null);
  const [player, setPlayer] = useState(null);

  // Saco los datos de la url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idPartida = queryParams.get("idPartida");
  const idJugador = queryParams.get("idJugador");
  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws?idJugador=${idJugador}`;
  const webSocket = useWebSocket(wsurl);


  // Lo primero q hago es un get
  useEffect(() => {
    const actualizarPartida = (nuevaPartida) => {
      setPartida(nuevaPartida);
    };
    // Hacer una solicitud GET a http://localhost:8000/partidas/{idPartida} cuando el componente se monte
    axios
      .get(`http://localhost:8000/jugadores/${idJugador}`)
      .then((response) => {
        setPlayer(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la partida:", error);
      });

    axios
      .get(`http://localhost:8000/partidas/${idPartida}`)
      .then((response) => {
        setPartida(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la partida:", error);
      });
  }, [idPartida, idJugador]);

  // Que muestre cargando mientras no se descargaron los datos
  if (!partida) {
    return <div>Cargando...</div>;
  }

  if (player.isAlive != null) {
    if (!player.isAlive) {
      return (
        <div className="contenedorPrincipal d-flex flex-column justify-content-center align-items-center">
          <div className="mt-5">
            <h2 className="text-danger">Te han eliminado...</h2>
            <p className="lead">Fin de la partida</p>
          </div>
        </div>
      );
    }
  }

  // Variables locales para acceder a los datos más fácilmente
  const { iniciada, turnoActual, sentido, jugadores } = partida;

  // Ordeno a los jugadores por posicion
  const arrayJugadoresOrdenados = jugadores
    .slice()
    .sort((a, b) => a.posicion - b.posicion);
  let jugadorConTurnoActual = arrayJugadoresOrdenados[0];
  if (turnoActual != null) {
    jugadorConTurnoActual = arrayJugadoresOrdenados.find(
      (jugador) => jugador.posicion === turnoActual
    );
  }

  // Mostrar oponentes
  const jugadoresFiltrados = arrayJugadoresOrdenados.filter(
    (jugador) => jugador.id !== idJugador && jugador.isAlive === 1
  );

  if (jugadoresFiltrados.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="alert alert-success text-center animated fadeIn"
          role="alert"
        >
          Partida Finalizada, ¡eres el ganador!
        </div>
      </div>
    );
  }

  // obtengo mi jugador actual

  // Si la partida no esta iniciada que muestre que no esta iniciada
  if (iniciada === false || iniciada == null) {
    return <div>Partida no iniciada...</div>;
  }

  const esTurno = idJugador.toString() === jugadorConTurnoActual.id.toString();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-auto ">
          <InfoPartida
            jugadorConTurnoActual={jugadorConTurnoActual}
            esTurno={esTurno}
            sentido={sentido}
            partida={partida}
            jugadorEnJuego={player}
          />
        </div>
        <div className="col ">
          <PartidaEnCurso
            oponentes={jugadoresFiltrados}
            jugadorActual={player}
            esTurno={esTurno}
            idJugador={idJugador}
          />
        </div>
      </div>
    </div>
  );
}
export function actualizarPartida(nuevaPartida) {
  Partida.setPartida(nuevaPartida);
}
export default Partida;
