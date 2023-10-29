import axios from "axios";
import { showErrorMsg, showSuccessMsg } from "../utils/Toasts";
import {
  JugadorAbandonoLobby,
  JugadorCreadoMsg,
  JugadorNoExistente,
  PartidaCreadaConExito,
} from "../utils/Mensajes";
import Jugador from "./models/Jugador";
import Partida from "./models/Partida";

const BASE_URL = "http://localhost:8000";

//#region crearJugador

export async function apiCrearJugador(nombreJugador) {
  const url = BASE_URL + `/jugadores?nombre=${nombreJugador}`;

  try {
    const response = await axios.post(url);
    showSuccessMsg(JugadorCreadoMsg);
    return response.data.id; // ID Jugador
  } catch (error) {
    if (error.message == "Network Error") {
      showErrorMsg(error.message);
    } else {
      // Muestro los mensajes del backend
      showErrorMsg(error.response.data.detail);
    }

    return null;
  }
}
//#endregion

//#region crearPartida
export async function apiCrearPartida(nombrePartida, idJugador) {
  const url =
    BASE_URL + `/partidas?nombrePartida=${nombrePartida}&idHost=${idJugador}`;

  try {
    const response = await axios.post(url);
    showSuccessMsg(PartidaCreadaConExito);
    return response.data.idPartida;
  } catch (error) {
    if (error.response.status == 500) {
      showErrorMsg(error.message);
    } else if (error.response.status == 422) {
      showErrorMsg(JugadorNoExistente);
    } else {
      // Muestro los mensajes del backend
      showErrorMsg(error.response.data.detail);
    }

    return null;
  }
}
//#endregion

//#region obtener partidas
// TODO: cambiar
export async function apiObtenerPartidas() {
  const url = BASE_URL + "/partidas";

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return {
        success: true,
        partidas: response.data,
      };
    } else {
      return {
        success: false,
        message: "Error al obtener las partidas",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Error de red al obtener las partidas",
      error: err,
    };
  }
}
//#endregion

//#region  getJugador
export async function apiObtenerJugador(idJugador) {
  const url = BASE_URL + `/jugadores/${idJugador}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const jugador = new Jugador(
      idJugador,
      data.nombre,
      data.isHost,
      data.posicion,
      data.isAlive,
      data.blockIzq,
      data.blockDer,
      data.rol,
      data.cartas
    );
    return jugador;
  } catch (error) {
    if (error.message == "Network Error") {
      showErrorMsg(error.message);
    } else {
      // Muestro los mensajes del backend
      showErrorMsg(error.response.data.detail);
    }

    return null;
  }
}
//#endregion

export async function apiObtenerPartida(idPartida) {
  const url = BASE_URL + `/partidas/${idPartida}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const partida = new Partida(
      idPartida,
      data.nombre,
      data.maxJugadores,
      data.minJugadores,
      data.iniciada,
      data.turnoActual,
      data.sentido,
      data.jugadores
    );
    return partida;
  } catch (error) {
    if (error.message == "Network Error") {
      showErrorMsg(error.message);
    } else {
      showErrorMsg(error.response.data.detail);
    }

    return null;
  }
}

export async function apiIniciarPartida(idPartida) {
  const url = BASE_URL + `/partidas/iniciar?idPartida=${idPartida}`;

  try {
    const response = await axios.put(url);

    if (response.status === 200) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
}

export async function apiAbandonarLobby(idJugador) {
  const url = BASE_URL + `/jugadores/${idJugador}/abandonar_lobby`;

  try {
    await axios.put(url);
    showSuccessMsg(JugadorAbandonoLobby);
    return true;
  } catch (error) {
    if (error.message == "Network Error") {
      showErrorMsg(error.message);
    } else {
      // Muestro los mensajes del backend
      showErrorMsg(error.response.data.detail);
    }

    return null;
  }
}
