// Game.js

import {
  apiCrearJugador,
  apiCrearPartida,
  apiObtenerJugador,
} from "./data/apiService";
import localStorage from "./data/localStorage";
import Jugador from "./data/models/Jugador";

// Game se encarga de manejar el contexto, localStorage y el llamado a las apis,
// Es el unico que puede estar en comunicacion con mis componentes, para
// cualquier accion que afecte al juego

const Game = () => {
  /**
   * Crea un jugador con un nombre y devuelve su ID de usuario si se crea con éxito.
   * @param {string} nombre - El nombre del jugador.
   * @returns {number | null} El ID del jugador si se crea con éxito, o null en caso de error.
   */
  const crearJugador = async (nombre) => {
    const userId = await apiCrearJugador(nombre);
    if (isNotNull(userId)) {
      localStorage.saveUserId(userId);
      return userId;
    }
    return null;
  };

  /**
   * Crea una partida con un nombre y un ID de jugador.
   * @param {string} nombrePartida - El nombre de la partida.
   * @param {number} idJugador - El ID del jugador.
   * @returns {number | null} El ID de la partida si se creó con éxito, o null en caso de error.
   */
  const crearPartida = async (nombrePartida, idJugador) => {
    const partidaId = await apiCrearPartida(nombrePartida, idJugador);
    if (isNotNull(partidaId)) {
      localStorage.saveMatchId(partidaId);
      return partidaId;
    }
    return null;
  };

  /**
   * Obtiene un jugador con un ID de jugador.
   * @param {number} idJugador - El ID del jugador.
   * @returns {Jugador | null} El Jugador obj, o null en caso de error.
   */
  const getJugador = async (idJugador) => {
    const jugador = await apiObtenerJugador(idJugador);
    if (isNotNull(jugador)) {
      return jugador;
    }
    return null;
  };

  // Otras funciones relacionadas con la lógica del juego

  return {
    crearPartida,
    crearJugador,
    getJugador,
  };
};

const isNotNull = (value) => {
  if (value != null) {
    return true;
  }
  return false;
};

export default Game;
