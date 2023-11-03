import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoPartida from "../components/InfoPartida";
import FinalizarPartida from "../components/FinalizarPartida";
import PartidaEnCurso from "../components/PartidaEnCurso";
import { useWebSocket } from "../contexto/WebSocketContext";
import "../styles/Partida.css";
import Game from "../Game";
import localStorage from "../data/localStorage";
import { showErrorMsg } from "../utils/Toasts";
import { JugadorNoExistente } from "../utils/Mensajes";

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

  if(!userId) {
    showErrorMsg(JugadorNoExistente)
    setTimeout(() => {
      navigate(`/`);
    }, 0);
  }
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





  console.log(store)
  if(resultados!=null){
    return <FinalizarPartida isHumanoTeamWinner={resultados.isHumanoTeamWinner} winners={resultados.winners} idJugador={userId}></FinalizarPartida>
  }

  // if (jugadorStore != null) {
  //   if (!jugadorStore.isAlive) {
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

  const esTurno =
  jugadorStore?.id.toString() === jugadorConTurnoActual?.id.toString();



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
