import React, { useState } from 'react';

function CrearPartidaForm() {
  // Estado para almacenar el nombre de la partida
  const [nombrePartida, setNombrePartida] = useState('');

  // Función para manejar el envío del formulario
  const handleCrearPartida = (e) => {
    e.preventDefault();
    // Aca debería enviar el nombre de la partida y de jugador al backend.
    console.log('Nombre de la partida:', nombrePartida);
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
    </div>
  );
}

export default CrearPartidaForm;
