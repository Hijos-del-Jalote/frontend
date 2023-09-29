import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios

function CrearPartida() {
  const [nombrePartida, setNombrePartida] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');

  const handleCrearPartida = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos al backend
      const respuesta = await axios.post('URL_DEL_BACKEND', {
        nombrePartida: nombrePartida,
        // Otros datos relacionados con la partida, si es necesario
      });

      // Manejar la respuesta del backend
      setMensajeRespuesta(respuesta.data);
      
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      setMensajeRespuesta('Error al crear la partida');
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5">Crear Partida</h2>
      <form onSubmit={handleCrearPartida}>
        <div className="mb-3">
          <label htmlFor="nombrePartida" className="form-label">Nombre de la partida:</label>
          <input
            type="text"
            className="form-control"
            id="nombrePartida"
            value={nombrePartida}
            onChange={(e) => setNombrePartida(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Partida</button>
      </form>
      {mensajeRespuesta && <p className="mt-3">{mensajeRespuesta}</p>}
    </div>
  );
}

export default CrearPartida;
