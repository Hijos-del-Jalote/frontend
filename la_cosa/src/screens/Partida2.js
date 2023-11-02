import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InfoPartida from "../components/InfoPartida";
import FinalizarPartida from "../components/FinalizarPartida";
import PartidaEnCurso from "../components/PartidaEnCurso";
import { useWebSocket } from "../contexto/WebSocketContext";
import "../styles/Partida.css";
import { StoreContext } from "../contexto/StoreProvider";
import Game from "../Game";
import localStorage from "../data/localStorage";

function Partida() {
  const game = Game();

  const [store, setStore] = useState(null);
  const [resultados, setResultados] = useState(null);


  const jugadorStore = store?.jugador;
  const partidaStore = store?.partida;
  const navigate = useNavigate();

 ;

  const matchId = localStorage.getMatchId();
  const userId = localStorage.getUserId();
  const wsurl = `ws://localhost:8000/partidas/${matchId}/ws?idJugador=${userId}`;

  const webSocket = useWebSocket(wsurl)

  useEffect(() => {
    const fetchData = async (idPartida, idJugador) => {
      const partidaApi = await game.getPartida(idPartida);
      const jugadorApi = await game.getJugador(idJugador);
  
      if (partidaApi != null && jugadorApi != null) {
        // Actualiza ambos estados al mismo tiempo
        setStore({ partida: partidaApi, jugador: jugadorApi });
      }
    };



    if (webSocket.readyState == 1) {
      webSocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.event === "finalizar") {
          setResultados(JSON.parse(data.data));
        }
      };
    }
    fetchData(matchId, userId);
  }, [webSocket]);

  if (partidaStore == undefined || jugadorStore == undefined) {
    return <div></div>;
  }
  if(resultados!=null){
    return <FinalizarPartida isHumanoTeamWinner={resultados.isHumanoTeamWinner} winners={resultados.winners} idJugador={userId}></FinalizarPartida>
  }

  // // Que muestre cargando mientras no se descargaron los datos
  // if (loading == null || !loading) {
  //   return <div>Cargando...</div>;
  // }

  // if (player != null) {
  //   if (!player.isAlive) {
  //     return (
  //       <div className="contenedorPrincipal d-flex flex-column justify-content-center align-items-center">
  //         <div className="mt-5">
  //           <h2 className="text-danger">Te han eliminado...</h2>
  //           <p className="lead">Fin de la partida</p>
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  // Ordeno a los jugadores por posicion
  const arrayJugadoresOrdenados = partidaStore?.jugadores
    .slice()
    .sort((a, b) => a.posicion - b.posicion);
  let jugadorConTurnoActual = null;
  for(var i in arrayJugadoresOrdenados){
    if(arrayJugadoresOrdenados[i].id == partidaStore.turnoActual){
      jugadorConTurnoActual = arrayJugadoresOrdenados[i];
    }
  }
  // Mostrar oponentes
  const jugadoresFiltrados = arrayJugadoresOrdenados?.filter(
    (jugador) =>
      jugador.id.toString() != jugadorStore?.id.toString() &&
      jugador.isAlive === 1
  );
  if (jugadoresFiltrados?.length === 0) {
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

  // // obtengo mi jugador actual

  // // Si la partida no esta iniciada que muestre que no esta iniciada
  // if (iniciada === false || iniciada == null) {
  //   return <div>Partida no iniciada...</div>;
  // }

  const esTurno =
    jugadorStore?.id.toString() === jugadorConTurnoActual?.id.toString();

    console.log(partidaStore)
  return (
    <div className="container-partida">
      <div>
        {jugadorStore?.id && (
          <InfoPartida
            jugadorConTurnoActual={jugadorConTurnoActual}
            esTurno={esTurno}
            sentido={partidaStore.sentido}
            partida={partidaStore}
            jugadorEnJuego={jugadorStore}
          />
        )}
      </div>
      <div>
        {jugadorStore && (
          <PartidaEnCurso
            oponentes={jugadoresFiltrados}
            jugadorActual={jugadorStore}
            esTurno={esTurno}
            webSocket={webSocket}
          />
        )}
      </div>
    </div>
  );
}

export default Partida;
