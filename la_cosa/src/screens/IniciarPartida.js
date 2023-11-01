import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/IniciarPartida.css";
import { StoreContext } from "../contexto/StoreProvider";
import Game from "../Game";




function IniciarPartida() {
  const game = Game();

  const [players, setPlayers] = useState([]);
  const [responseText, setResponseText] = useState("");
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

    if(partidaStore.iniciada){
      navigate(`/partida?idJugador=${jugadorStore.id}&idPartida=${partidaStore.id}`)
    }

    setPlayers(partidaStore.jugadores);
    


    if(webSocket){
      webSocket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log("Datos recibidos:", data);
        if (data.event === "unir"){
          setPlayers(JSON.parse(data.data).jugadores);
        }
        if(data.event === "iniciar"){
          navigate(`/partida?idJugador=${jugadorStore.id}&idPartida=${partidaStore.id}`)
        }
        if (data.event === "abandonar lobby"){
          if ((data.data).host) {
              setTimeout(() => {
                  setResponseText("El host abandonó el lobby, saliendo...");
                  navigate(`/home/crear?idJugador=${jugadorStore.id}`);
              }, 2000);
          }
          else {
              if ((data.data).jugadores.id === jugadorStore.id) {
                  setTimeout(() => {
                      setResponseText("Saliendo del lobby...");
                      navigate(`/home/crear?idJugador=${jugadorStore.id}`);
                  }, 2000);
              }
              setPlayers((data.data).jugadores);
          }
        
      }
      }
    }
    

    
  }, [partidaStore,webSocket,jugadorStore,navigate,store]);
  
  const handleSubmit = (partidaID, jugadorID) => {
    axios
      .put(`http://localhost:8000/partidas/iniciar?idPartida=${partidaID}`)
      .then((data) =>
        navigate(`/partida?idJugador=${jugadorID}&idPartida=${partidaID}`)
      )
      .catch((error) => {
        setResponseText("Error al iniciar partida, compruebe la cantidad de jugadores");
        console.log(error);
      });
  };
  const handleAbandonarLobby = async (id) => {
    const exito = game.abandonarLobby(id,dispatch);
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