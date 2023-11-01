import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import InfoPartida from "../components/InfoPartida";
import PartidaEnCurso from "../components/PartidaEnCurso";
import { useWebSocket } from "../components/WebSocketContext";
import FinalizarPartida from "../components/FinalizarPartida";
import "../styles/Partida.css";
import { StoreContext } from "../contexto/StoreProvider";
import Game from "../Game";

function Partida() {
  const game = Game();

  const [jugadorStore, setjugadorStore] = useState(null);
  const [partidaStore, setpartidaStore] = useState(null);
  const navigate = useNavigate();
  const [store,dispatch] = useContext(StoreContext);

  let webSocket;


    

  useEffect(() => {
    if(store.jugador == null || store.partida == null){
      return;
    }
    setjugadorStore(store.jugador);
    setpartidaStore(store.partida);

   
    if(jugadorStore?.id === undefined || partidaStore?.id === undefined){
      return;
    }

    const wsurl = `ws://localhost:8000/partidas/${partidaStore.id}/ws?idJugador=${jugadorStore.id}`;
    webSocket = new WebSocket(wsurl);
    


    if(webSocket){
            webSocket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log("Datos recibidos:", data);
        if (data.event === "finalizar"){
          console.log(data.isHumanoTeamWinner)
          console.log(data.winners)
          
        }
      }
    }
    

    
  }, [partidaStore,webSocket,jugadorStore,navigate,store]);
  
  // const [store,dispatch] = useContext(StoreContext);
  // // Variables generales
  // const [player, setPlayer] = useState(null);
  // const [resultados, setResultados] = useState(null);
  // const [partida, setPartida] = useState(null);
  // const [loading, setLoading] = useState(null);
  // //Navegacion
  // const navigate = useNavigate();
  // // Saco los datos de la url
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const jugador = store.jugador;
  
  // const partidaStore = store.partida;

  // let idPartida;
  // let idJugador;


  // //Websocket 
  // let webSocket;


  // // Lo primero q hago es un get
  // useEffect(() => {
    
  //   console.log(partidaStore)
  //   if(partidaStore == null || jugador == null){
  //     setLoading(true)
  //     return;
  //   }
  //   setPartida(partidaStore);
  //   setPlayer(jugador)
  //   idJugador= jugador.id;
  //   idPartida = partidaStore.id;
  //   const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws?idJugador=${idJugador}`;
  //   webSocket = new WebSocket(wsurl);

  //   if(webSocket){
  //     webSocket.onmessage = function(event) {
  //       const data = JSON.parse(event.data);
  //       console.log("Datos recibidos:", data);
  //       if (data.event === "finalizar"){
  //         console.log(data.isHumanoTeamWinner)
  //         console.log(data.winners)
  //         setResultados(JSON.parse((data.data)));
          
  //       }
  //     }
  //   }

  // }, [partida,jugador]);

  // if(resultados!=null){
  //   return <FinalizarPartida isHumanoTeamWinner={resultados.isHumanoTeamWinner} winners={resultados.winners} idJugador={idJugador}></FinalizarPartida>
  // }

  // console.log(partida)
  // // Que muestre cargando mientras no se descargaron los datos
  // console.log(loading)
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

  // // Variables locales para acceder a los datos más fácilmente
  // console.log(partida)
  // const { iniciada, turnoActual, sentido, jugadores } = partida;

  // Ordeno a los jugadores por posicion
  const arrayJugadoresOrdenados = partidaStore?.jugadores
    .slice()
    .sort((a, b) => a.posicion - b.posicion);
  let jugadorConTurnoActual = arrayJugadoresOrdenados != null ? arrayJugadoresOrdenados[0] : null;
  if (jugadorConTurnoActual != null && partidaStore.turnoActual != null) {
    jugadorConTurnoActual = arrayJugadoresOrdenados.find(
      (jugador) => jugador.posicion === partidaStore.turnoActual
    );
  }

  // Mostrar oponentes
  const jugadoresFiltrados = arrayJugadoresOrdenados?.filter(

    (jugador) => jugador.id.toString() !== jugadorStore?.id.toString() && jugador.isAlive === 1

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

  const esTurno = jugadorStore?.id.toString() === jugadorConTurnoActual?.id.toString();
  return (
    <div className="container-partida">
        <div >
          {jugadorStore?.id && <InfoPartida
            jugadorConTurnoActual={jugadorConTurnoActual}
            esTurno={esTurno}
            sentido={partidaStore.sentido}
            partida={partidaStore}
            jugadorEnJuego={jugadorStore}
          />}
        </div>
        <div >
          {jugadorStore && <PartidaEnCurso
            oponentes={jugadoresFiltrados}
            jugadorActual={jugadorStore}
            esTurno={esTurno}
            idJugador={jugadorStore?.id}
            idPartida={partidaStore?.id}
          />}
        </div>
    </div>
  );
}
export function actualizarPartida(nuevaPartida) {
  Partida.setPartida(nuevaPartida);
}
export default Partida;
