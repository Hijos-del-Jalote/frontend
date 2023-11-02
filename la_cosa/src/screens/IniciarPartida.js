import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/IniciarPartida.css";
import Game from "../Game";
import { useWebSocket } from "../contexto/WebSocketContext";




function IniciarPartida() {
  const game = Game();

  const [players, setPlayers] = useState([]);
  const [responseText, setResponseText] = useState("");
  const navigate = useNavigate();


  const [store,setStore] = useState(null);
  const jugadorStore = store?.jugador;
  const partidaStore = store?.partida;

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


    if(partidaStore?.iniciada){
      navigate(`/partida`)
    }

    setPlayers(partidaStore?.jugadores);
    


    if(webSocket){
      webSocket.onmessage = async function(event) {
        const data = JSON.parse(event.data);
        console.log("Datos recibidos:", data);
        if (data.event === "unir"){
          setPlayers(JSON.parse(data.data).jugadores);
        }
        if(data.event === "iniciar"){
          setTimeout(() => {
            navigate(`/partida`);
        }, 1000);
        }
        if (data.event === "abandonar lobby"){
          if ((data.data).host) {
              setTimeout(() => {
                  setResponseText("El host abandonó el lobby, saliendo...");
                  navigate(`/home/crear`);
              }, 2000);
          }
          else {
              if ((data.data).jugadores.id === jugadorStore.id) {
                  setTimeout(() => {
                      setResponseText("Saliendo del lobby...");
                      navigate(`/home/crear`);
                  }, 2000);
              }
              setPlayers((data.data).jugadores);
          }
        
      }
      }
    }

    fetchData(matchId, userId);
    

    
  }, [partidaStore,webSocket,jugadorStore,navigate,store]);
  
  const handleSubmit = (partidaID, jugadorID) => {
    axios
      .put(`http://localhost:8000/partidas/iniciar?idPartida=${partidaID}`)
      .then((data) =>
        navigate(`/partida`)
      )
      .catch((error) => {
        setResponseText("Error al iniciar partida, compruebe la cantidad de jugadores");
        console.log(error);
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
      <button className="button_iniciar" onClick={() => handleSubmit(partidaStore.id, jugadorStore.id)}>
  Iniciar Partida
</button>
<button className="button_eliminar" onClick={() => handleAbandonarLobby(jugadorStore.id)}>
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