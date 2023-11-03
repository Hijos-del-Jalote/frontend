import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CrearPartida.css";
import Game from "../Game";
import localStorage from "../data/localStorage";

function CrearPartida() {
  const game = Game();
  const navigate = useNavigate();
  const [nombrePartida, setNombrePartida] = useState("");
  // Saco de la url mi idJugador

  const idJugador = localStorage.getUserId();

  const handleCrearPartida = async (e) => {
    const partidaId = await game.crearPartida(nombrePartida,idJugador);
    if (partidaId != null) {
      setTimeout(() => {
        navigate(`/lobby`);
      }, 0);
    }
  };

  return (
    <div className="container_crear_partida">
      <h2 className="title_crear_partida">Crear una partida</h2>
        <label htmlFor="nombrePartida" className="form-label">
          Nombre de la partida:
        </label>
        <input
          type="text"
          className="form-control"
          id="nombrePartida"
          data-testid="nombrePartida"
          placeholder="Insertar nombre de la partida"
          value={nombrePartida}
          onChange={(e) => setNombrePartida(e.target.value)}
          
        />
        <button onClick={handleCrearPartida} className="button">
          Crear Partida
        </button>
    </div>
  );
}

export default CrearPartida;
