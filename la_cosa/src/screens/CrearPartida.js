import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CrearPartida.css";
import Game from "../Game";
import { StoreContext } from "../contexto/StoreProvider";

function CrearPartida() {
  const game = Game();
  const navigate = useNavigate();
  const [nombrePartida, setNombrePartida] = useState("");
  // Saco de la url mi idJugador

  const [store, dispatch] = useContext(StoreContext);
  const idJugador = store.jugador.id;

  const handleCrearPartida = async (e) => {
    const partidaId = await game.crearPartida(nombrePartida,idJugador,dispatch);
    if (partidaId != null) {
      setTimeout(() => {
        navigate(`/lobby`);
      }, 1000);
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
