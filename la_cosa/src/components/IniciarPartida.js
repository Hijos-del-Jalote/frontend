import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function IniciarPartida() {
  const [searchParams] = useSearchParams();
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/partidas/${idPartida}`);
        if (response.status === 200) {
          setPlayers(response.data.jugadores);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [idPartida]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (players.length >= 4 && players.length <= 12) {
      axios
        .put(`http://localhost:8000/partidas/iniciar?idPartida=${idPartida}`)
        .then((data) =>
          navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`)
        )
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <ul>
        {players?.length
          ? players.map((jugador, index) => {
              return <li key={index}>{jugador.nombre}</li>;
            })
          : null}
      </ul>
      <button  onClick={handleSubmit}>
        Iniciar Partida
      </button>
    </>
  );
}

export default IniciarPartida;
