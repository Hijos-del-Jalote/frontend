import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";

export default function IniciarPartida() {
  const [searchParams] = useSearchParams();
  const [jugadores, setJugadores] = useState([
    { nombre: "nombre1" },
    { nombre: "nombre2" },
    { nombre: "nombre3" },
    { nombre: "nombre4" },
  ]);

  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");
  
  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:8000/jugador?idPArtida=${idPartida}`)
      .then((data) => setJugadores(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jugadores >= 4 && jugadores <= 12) {
      axios
        .put(`http://localhost:8000/partidas/iniciar?idPartida=${idPartida}`)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <ul>
        {jugadores?.length &&
          jugadores.map((jugador, index) => {
            return <li key={index}>{jugador.nombre}</li>;
          })}
      </ul>
      <button
        disabled={jugadores?.length < 4 && jugadores?.length > 12}
        onClick={() => handleSubmit}
      >
        Iniciar Partida
      </button>
    </>
  );
}
