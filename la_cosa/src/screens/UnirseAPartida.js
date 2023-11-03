import React, { useState, useEffect, useContext } from "react";
import "../styles/UnirseAPartida.css";
import Game from "../Game";
import localStorage from "../data/localStorage";

function UnirseAPartida() {

  const game = Game();
  const [partidas, setPartidas] = useState([]);

  const idJugador = localStorage.getUserId();

  useEffect(() => {
    
    const fetchData = async () => {
      const partidasget = await game.getAllPartidas();
      if(partidasget != null) {setPartidas(partidasget)};
    };

    fetchData(); // Llama a la función fetchData inmediatamente
  }, []);

  const handleUnirseAPartida = async (partidaId) => {
    console.log(partidaId)
    game.unirsePartida(partidaId, idJugador)
  };

  return (
    <div className="container_unirse">
      <h2>Lista de Partidas Disponibles</h2>
      <div className="lista_partida">
        {partidas && partidas.map((partida) => (
          <div key={partida.id} className="card_partida">
            <h4 className="partida_nombre">
              {partida.nombre}
            </h4>
            <div className="cantidad_jugadores">
            <div className="text_maxmin">
              Max Jugadores: {partida.maxJug}
            </div>
            <div className="text_maxmin">
              Min Jugadores: {partida.minJug}
            </div>
            </div>
            <button
              onClick={() => handleUnirseAPartida(partida.id)}
              className="button_unirse"
            >
              Unirse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnirseAPartida;
