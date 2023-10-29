import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/IniciarPartida.css";
import { useWebSocket } from "../components/WebSocketContext";
import { StoreContext } from "../contexto/StoreProvider";
import Game from "../Game";




function IniciarPartida() {
  const game = Game();

  const [players, setPlayers] = useState([]);
  const [responseText, setResponseText] = useState("");
  
  const navigate = useNavigate();
  const [store] = useContext(StoreContext);
  const idJugador = store.jugador.id;
  const partida = store.partida;
  const idPartida = partida.id;

  let webSocket;


    

  useEffect(() => {

    if(idJugador === undefined || idPartida === undefined){
      return;
    }

    const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws?idJugador=${idJugador}`;
    webSocket = new WebSocket(wsurl);

    if(partida.iniciada){
      navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`)
    }

    setPlayers(partida.jugadores);
    


    if(webSocket){
      webSocket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log("Datos recibidos:", data);
        if (data.event === "unir"){
          setPlayers(JSON.parse(data.data).jugadores);
        }
        if(data.event === "iniciar"){
          navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`)
        }
        if (data.event === "abandonar lobby"){
          if ((data.data).host) {
              setTimeout(() => {
                  setResponseText("El host abandonó el lobby, saliendo...");
                  navigate(`/home/crear?idJugador=${idJugador}`);
              }, 2000);
          }
          else {
              if ((data.data).jugadores.id === idJugador) {
                  setTimeout(() => {
                      setResponseText("Saliendo del lobby...");
                      navigate(`/home/crear?idJugador=${idJugador}`);
                  }, 2000);
              }
              setPlayers((data.data).jugadores);
          }
        
      }
      }
    }
    

    
  }, [idPartida,webSocket,idJugador,navigate]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/partidas/iniciar?idPartida=${idPartida}`)
      .then((data) =>
        navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`)
      )
      .catch((error) => {
        setResponseText("Error al iniciar partida, compruebe la cantidad de jugadores");
        console.log(error);
      });
  };
  const handleAbandonarLobby = async () => {
    const exito = game.abandonarLobby(idJugador);
    if(exito != null) {
      setTimeout(() => {
        navigate(`/home/crear`);
      }, 1000);
    }
  };


  return (
    <div className="container_iniciar">
    <div className="subcontainer">
        <h2 className="lobby_tittle">Lobby de la Partida</h2>
        <p>Esperando a los jugadores...</p>
      <div className="jugadores_container">
          {players?.length ? (
            players.map((jugador, index) => (
              <div className="jugador_card_iniciar"
                key={index}
                
              >
              <div>Jugador:</div>
              <div className="nombre_jug">{jugador.nombre}</div>
                
                  
              </div>
            ))
          ) : (
            <div >
              No hay jugadores aún.
            </div>
          )}
      </div>
      <div className="contenedor_b">
        <button className="button_iniciar" onClick={handleSubmit} >
          Iniciar Partida
        </button>
      <button className="button_eliminar" onClick={handleAbandonarLobby} >
          Abandonar Lobby
        </button>
        </div>
        {responseText && (
        <p className="mt-3 alert alert-info">{responseText}</p>
      )}
        </div>
    </div>
  );
}

export default IniciarPartida;