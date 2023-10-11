import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWebSocket } from './WebSocketContext';



function IniciarPartida() {
  const [searchParams] = useSearchParams();
  const [players, setPlayers] = useState([]);
  const [responseText, setResponseText] = useState("");
  const navigate = useNavigate();
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");
  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws`;
  const webSocket = useWebSocket(wsurl);



    

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/partidas/${idPartida}`
        );
        if (response.status === 200) {
          setPlayers(response.data.jugadores);
          if(response.data.iniciada){
            navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
      }
    }
    
    fetchData();
    
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


  return (
    <>
      <div className="text-center mb-4">
        <h2 className="mb-3">Lobby de la Partida</h2>
        <p>Esperando a los jugadores...</p>
      </div>
      <div className="d-flex justify-content-center">
        <ul className="list-group">
          {players?.length ? (
            players.map((jugador, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center m-2"
              >
                {jugador.nombre}
                <span className="badge bg-primary rounded-pill m-2">
                  Jugador
                </span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">
              No hay jugadores aún.
            </li>
          )}
        </ul>
      </div>
      <div className="text-center mt-4">
        <button onClick={handleSubmit} className="btn btn-primary">
          Iniciar Partida
        </button>
        <div>{responseText && <p className="mt-3">{responseText}</p>}</div>
      </div>
    </>
  );
}

export default IniciarPartida;