import axios from "axios";
import { showErrorMsg, showSuccessMsg } from "../utils/Toasts";
import {JugadorCreadoMsg,PartidaCreadaConExito} from "../utils/Mensajes";
import Jugador from "./models/Jugador";

const BASE_URL = "http://localhost:8000";

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

export async function apiObtenerJugador(idJugador) {
  const url = BASE_URL + `/jugadores/${25}`;

  try {
    const response = await axios.get(url);
    const data= response.data;
    const jugador = new Jugador(
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

export async function apiCrearPartida(nombrePartida, idJugador) {
  const url =
    BASE_URL + `/partidas?nombrePartida=${nombrePartida}&idHost=${idJugador}`;

  try {
    const response = await axios.post(url);
    console.log(response);
    showSuccessMsg(PartidaCreadaConExito);
    return response.data.idPartida;
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

export async function apiObtenerPartida(idPartida) {
  const url = BASE_URL + `/partidas/${idPartida}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return {
        success: true,
        jugadores: response.data.jugadores,
        partida: response.data,
        iniciada: response.data.iniciada,
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
