import React, { useState } from "react";
import axios from "axios"; // Importa Axios
import { useLocation } from "react-router-dom";

function CrearPartida() {
  const [nombrePartida, setNombrePartida] = useState("");
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  // Saco de la url mi idJugador
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idJugador = queryParams.get("idJugador") || 'Undefined';

  const handleCrearPartida = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos al backend
      const url =
      `http://localhost:8000/partidas?nombrePartida=${nombrePartida}&idHost=${idJugador}`;
      const respuesta = await axios.post(url);

      if(respuesta.status === 201) {
        setMensajeRespuesta("Partida creada exitosamente, redirigiendo al lobby...");
      }else {
        setMensajeRespuesta("Error al crear la partida");
      }

    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      setMensajeRespuesta("Error al crear la partida");
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5">Crear Partida</h2>
      <form onSubmit={handleCrearPartida}>
        <div className="mb-3">
          <label htmlFor="nombrePartida" className="form-label">
            Nombre de la partida:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombrePartida"
            data-testid="nombrePartida"
            value={nombrePartida}
            onChange={(e) => setNombrePartida(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Partida
        </button>
      </form>
      {mensajeRespuesta && <p className="mt-3">{mensajeRespuesta}</p>}
    </div>
  );
}

export default CrearPartida;
