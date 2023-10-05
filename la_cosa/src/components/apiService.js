import axios from "axios";

const BASE_URL = "http://localhost:8000";

export async function apiCrearJugador(nombreJugador) {
  const url = BASE_URL + `/jugadores?nombre=${nombreJugador}`;

  try {
    const response = await axios.post(url);

    if (response.status === 201) {
      return {
        success: true,
        playerId: response.data.id,
      };
    } else {
      return {
        success: false,
        message: "Error al crear el jugador",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Error de red al crear el jugador",
      error: err,
    };
  }
}

export async function apiObtenerJugador(idJugador) {
  const url = BASE_URL + `/jugadores/${idJugador}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return {
        success: true,
        jugador: response.data,
        nombre: response.nombre
      };
    } else {
      return {
        success: false,
        message: "Error al obtener el jugador",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Error de red al obtener el jugador",
      error: err,
    };
  }
}

export async function apiCrearPartida(nombrePartida, idJugador) {
    const url = BASE_URL + `/partidas?nombrePartida=${nombrePartida}&idHost=${idJugador}`;
  
    try {
      const response = await axios.post(url);
  
      if (response.status === 201) {
        const partidaId = response.data.idPartida;
        return {
          success: true,
          partidaId: partidaId,
          partida: response.data
        };
      } else {
        return {
          success: false,
          message: 'Error al crear la partida',
        };
      }
    } catch (err) {
      return {
        success: false,
        message: 'Error de red al crear la partida',
        error: err,
      };
    }
  }
  
