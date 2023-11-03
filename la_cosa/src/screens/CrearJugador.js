import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CrearJugador.css";
import Game from "../Game.js";
import localStorage from "../data/localStorage.js";

function CrearJugador() {
  const game = Game();

  if(localStorage.getUserId()) {
    setTimeout(() => {
      navigate(`/home/crear`);
    }, 0);
  }

  const navigate = useNavigate();

  const [nombreJugador, setNombreJugador] = useState("");

  const handleCrearJugador = async () => {
    
    const userId = await game.crearJugador(nombreJugador);
    if (userId != null) {
      setTimeout(() => {
        navigate(`/home/crear`);
      }, 0);
    }
  };

  return (
    <div className="container_principal">
      <div className="background-image"></div>
      <h1 className="welcome">¡Bienvenidos al juego La Cosa!</h1>

      <h4 className="subtitulos">Para comenzar a jugar:</h4>
      <input
        type="text"
        data-testid="nombreJugadorInput"
        placeholder="Insertar nombre"
        value={nombreJugador}
        onChange={(e) => setNombreJugador(e.target.value)}
        className="form-control"
      />
      <br />
      <button
        data-testid="buttonJugador"
        onClick={() => handleCrearJugador()}
        className="button"
      >
        Crear Jugador
      </button>
    </div>
  );
}
export default CrearJugador;
