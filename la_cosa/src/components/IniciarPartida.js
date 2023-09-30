import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function IniciarPartida() {
  const [searchParams] = useSearchParams();
  const [jugadores, setJugadores] = useState([]);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled]= useState(true)
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/jugador?idPartida=${idPartida}`)
      .then((data) => setJugadores(data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(()=>{
    if(jugadores?.length < 4 || jugadores?.length > 12){
      setIsDisabled(true)
    }else{
      setIsDisabled(false)
    }
  },[jugadores])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (jugadores.length >= 4 && jugadores.length <= 12) {
      axios
        .put(`http://localhost:8000/partidas/iniciar?idPartida=${idPartida}`)
        .then((data) =>
          navigate(`/partida/idJugador=${idJugador}&idPartida=${idPartida}`)
        )
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <ul>
        {jugadores?.length ?
          jugadores.map((jugador, index) => {
            return <li key={index}>{jugador.nombre}</li>;
          }):null}
      </ul>
      <button
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        Iniciar Partida
      </button>
    </>
  );
}
