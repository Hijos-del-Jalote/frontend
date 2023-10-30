// Game.js

import {
  apiAbandonarLobby,
  apiCrearJugador,
  apiCrearPartida,
  apiObtenerJugador,
  apiObtenerPartida,
} from "./data/apiService";
import localStorage from "./data/localStorage";
import Jugador from "./data/models/Jugador";
import Tipos from "./contexto/Actions";
import Partida from "./data/models/Partida";

// Game se encarga de manejar el contexto, localStorage y el llamado a las apis,
// Es el unico que puede estar en comunicacion con mis componentes, para
// cualquier accion que afecte al juego

const Game = () => {
  /**
   * Crea un jugador con un nombre y devuelve su ID de usuario si se crea con éxito.
   * @param {string} nombre - El nombre del jugador.
   * @param {function} dispatch - El nombre del jugador.
   * @returns {number | null} El ID del jugador si se crea con éxito, o null en caso de error.
   */
  async function crearJugador(nombre,dispatch) {
    const userId = await apiCrearJugador(nombre);
    if (isNotNull(userId)) {
      const jugador = await getJugador(userId);
      console.log(jugador);
      if (jugador != null) {
        dispatch({ type: Tipos.setJugador, payload: jugador });
      }
      localStorage.saveUserId(userId);
      return userId;
    }
    return null;
  }


  

  /**
   * Crea una partida con un nombre y un ID de jugador.
   * @param {string} nombrePartida - El nombre de la partida.
   * @param {number} idJugador - El ID del jugador.
   * @returns {number | null} El ID de la partida si se creó con éxito, o null en caso de error.
   */
  const crearPartida = async (nombrePartida, idJugador, dispatch) => {
    const partidaId = await apiCrearPartida(nombrePartida, idJugador);
    if (isNotNull(partidaId)) {
      const partida = await getPartida(partidaId);
      if(isNotNull(partida)) dispatch({ type: Tipos.setPartida, payload: partida });
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

  /**
   * Obtiene una partida con un ID de partida.
   * @param {number} idPartida - El ID de la partida.
   * @returns {Partida | null} El Partida obj, o null en caso de error.
   */
  const getPartida = async (idPartida) => {
    const partida = await apiObtenerPartida(idPartida);
    if (isNotNull(partida)) {
      return partida;
    }
    return null;
  };

  const abandonarLobby = async (idJugador, dispatch) => {
    const response = await apiAbandonarLobby(idJugador);
    if(response){
      dispatch({ type: Tipos.clearPartida});
      localStorage.deleteMatchId();
      return response;
    }
    return null;
  };

  return {
    crearPartida,
    crearJugador,
    getJugador,
    getPartida,
    abandonarLobby
  };
};

const isNotNull = (value) => {
  if (value != null) {
    return true;
  }
  return false;
};

export default Game;
