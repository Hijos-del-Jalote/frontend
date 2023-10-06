import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiIniciarPartida, apiObtenerPartida } from "./apiService";

function IniciarPartida() {
  const [searchParams] = useSearchParams();
  const [players, setPlayers] = useState([]);
  const [responseText, setResponseText] = useState("");
  const navigate = useNavigate();
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiObtenerPartida(idPartida);
        if (response.success) {
          setPlayers(response.jugadores);
          if (response.iniciada) {
            navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`);
          }
        } else {
          setResponseText("Error al obtener datos de la partida");
          if (response.error != null) {
            console.log(response.error);
          }
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    }

    fetchData();
  }, [idPartida, idJugador, navigate]);

  const handleSubmit = async (e) => {
    const response = await apiIniciarPartida(idPartida);

    if (response.success) {
      navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`);
    } else {
      setResponseText(
        "Error al iniciar partida, compruebe la cantidad de jugadores"
      );
    }
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
