import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/IniciarPartida.css";
import Game from "../Game";
import { useWebSocket } from "../contexto/WebSocketContext";
import localStorage from "../data/localStorage";
import { showErrorMsg, showInfoMsg } from "../utils/Toasts";
import { ErrorIniciarPartida, HostAbandonoLobby, SaliendoDelLobby } from "../utils/Mensajes";




function IniciarPartida() {
  const game = Game();

  const navigate = useNavigate();


  const [store,setStore] = useState(null);
  
  
  const jugadorStore = store?.jugador;
  const partidaStore = store?.partida;
  const players = partidaStore?.jugadores;

  const matchId = localStorage.getMatchId();
  const userId = localStorage.getUserId();
  const wsurl = `ws://localhost:8000/partidas/${matchId}/ws?idJugador=${userId}`;
  const webSocket = useWebSocket(wsurl)

  useEffect(() => {

    const fetchData = async (idPartida, idJugador) => {
      if(store == null){
      const partidaApi = await game.getPartida(idPartida);
      const jugadorApi = await game.getJugador(idJugador);
  
      if (partidaApi != null && jugadorApi != null) {
        // Actualiza ambos estados al mismo tiempo
        setStore({ partida: partidaApi, jugador: jugadorApi });
      }}
    };

    


    if(webSocket){
      webSocket.onmessage = async function(event) {
        const data = JSON.parse(event.data);
        console.log("Datos recibidos:", data);
        if (data.event === "unir") {
          const parsedData = JSON.parse(data.data);
          setStore({ partida: parsedData, jugador: store?.jugador });
        }
        
        if(data.event === "iniciar"){
          setTimeout(() => {
            navigate(`/partida`);
        }, 1000);
        }
        if (data.event === "abandonar lobby") {
          if (data.data.host) {
            setTimeout(() => {
              showInfoMsg(HostAbandonoLobby);
              navigate(`/home/crear`);
            }, 2000);
          } else {
            const playerIndex = data.data.jugadores.findIndex((jugador) => jugador.id === userId);
            if (playerIndex !== -1) {
              setTimeout(() => {
                showInfoMsg(SaliendoDelLobby);
                navigate(`/home/crear`);
              }, 2000);
            }
            setStore({ partida: data.data, jugador: store?.jugador });
          }
        }
      }
    }

    fetchData(matchId, userId);
    

    
  }, [webSocket,userId,matchId]);



  if(partidaStore?.iniciada){
    navigate(`/partida`)
  }

  
  const handleSubmit = (partidaID) => {
    axios
      .put(`http://localhost:8000/partidas/iniciar?idPartida=${partidaID}`)
      .then((data) =>
        navigate(`/partida`)
      )
      .catch((error) => {
        showErrorMsg(ErrorIniciarPartida)
      });
  };
  const handleAbandonarLobby = async (id) => {
    const exito = game.abandonarLobby(id);
    if(exito != null) {
      setTimeout(() => {
        navigate(`/home/crear`);
      }, 0);
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
              Cargando.
            </div>
          )}
      </div>
      <div className="contenedor_b">
      <button className="button_iniciar" onClick={() => handleSubmit(matchId, userId)}>
  Iniciar Partida
</button>
<button className="button_eliminar" onClick={() => handleAbandonarLobby(userId)}>
  Abandonar Lobby
</button>

        </div>
        </div>
    </div>
  );
}

export default IniciarPartida;