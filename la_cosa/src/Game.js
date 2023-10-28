// Game.js

import { apiCrearJugador, apiCrearPartida } from "./data/apiService";
import localStorage from "./data/localStorage";

// Game se encarga de manejar el contexto, localStorage y el llamado a las apis,
// Es el unico que puede estar en comunicacion con mis componentes, para
// cualquier accion que afecte al juego

const Game = () => {

  // nombre :: [ int, null]
  const crearJugador = async (nombre) => {
    const userId = await apiCrearJugador(nombre);
    if (isNotNull(userId)) {
      localStorage.saveUserId(userId);
      return userId;
    }
    return null;
  };

  const crearPartida = async (nombrePartida, idJugador) => {
    const partidaId = await apiCrearPartida(nombrePartida, idJugador);
    if (partidaId != null) {
      localStorage.saveMatchId(partidaId);
      return partidaId;
    }
    return null;
  };

  // Otras funciones relacionadas con la lógica del juego

  return {
    crearPartida,
    crearJugador,
  };
};

const isNotNull = (value) => {
  if (value != null) {
    return true;
  }
  return false;
};

export default Game;
