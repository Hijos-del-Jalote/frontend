// Game.js

import {
  apiAbandonarLobby,
  apiCrearJugador,
  apiCrearPartida,
  apiObtenerJugador,
  apiObtenerPartida,
  apiObtenerPartidas,
  apiUnirsePartida,
} from "./data/apiService";
import localStorage from "./data/localStorage";
import Jugador from "./data/models/Jugador";
import Partida from "./data/models/Partida";
import { useNavigate } from "react-router-dom";

// Game se encarga de manejar el contexto, localStorage y el llamado a las apis,
// Es el unico que puede estar en comunicacion con mis componentes, para
// cualquier accion que afecte al juego

const Game = () => {

  const navigate = useNavigate();
  /**
   * Crea un jugador con un nombre y devuelve su ID de usuario si se crea con éxito.
   * @param {string} nombre - El nombre del jugador.
   * @returns {number | null} El ID del jugador si se crea con éxito, o null en caso de error.
   */
  async function crearJugador(nombre) {
    const userId = await apiCrearJugador(nombre);
    if (isNotNull(userId)) {
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

  const abandonarLobby = async (idJugador) => {
    const response = await apiAbandonarLobby(idJugador);
    if (response) {
      localStorage.deleteMatchId();
      return response;
    }
    return null;
  };

  /**
   * Obtiene una partida con un ID de partida.
   * @returns {Lista de Partidas [ { {
    "id": 11,
    "nombre": "asd",
    "maxJug": 12,
    "minJug": 4
  },}] | null} El Partida obj, o null en caso de error.
   */
  const getAllPartidas = async () => {
    const response = await apiObtenerPartidas();
    if (response) {
      return response;
    }
    return null;
  };

    /**
   * Se une a una partida.
   * @param {string} partidaId - El id de partida.
   * @param {number} idJugador - El ID del jugador.
   * @returns {number | null} El ID de la partida si se creó con éxito, o null en caso de error.
   */
  const unirsePartida = async (partidaId, idJugador) => {
    if(await apiUnirsePartida(partidaId,idJugador)){
      localStorage.saveMatchId(partidaId);
      setTimeout(() => {
        navigate(`/lobby`);
      }, 0);
      return partidaId;
    }
  };

  return {
    crearPartida,
    crearJugador,
    getJugador,
    getPartida,
    abandonarLobby,
    getAllPartidas,
    unirsePartida
  };
};

const isNotNull = (value) => {
  if (value != null) {
    return true;
  }
  return false;
};

export default Game;
