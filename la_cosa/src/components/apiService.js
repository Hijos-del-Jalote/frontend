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
          message: 'Error al crear el jugador',
        };
      }
    } catch (err) {
      return {
        success: false,
        message: 'Error de red al crear el jugador',
        error: err,
      };
    }
  }
  
