import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

function CrearJugador() {
  const navigate = useNavigate();

  const [nombreJugador, setNombreJugador] = useState("");
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");

  const handleCrearJugador = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/jugadores?nombre=${nombreJugador}`,
        {
          nombre: nombreJugador,
        }
      );

      if (response.status === 201) {
        setMensajeRespuesta("Jugador creado exitosamente, redirigiendo al inicio ...");
        setNombreJugador("");

        setTimeout(() => {
            navigate('/home/crear');
        }, 2000)
      } else {
        setMensajeRespuesta("Error al crear el jugador");
      }
    } catch (error) {
      setMensajeRespuesta("Error al crear el jugador");
    }
  };
  return (
    <div className="container">
      <h1 className="welcome">Bienvenidos al juego La Cosa</h1>
      <div className="img">
        <img
          src="https://1.bp.blogspot.com/-CdbElErUVhY/WM1FKf5iynI/AAAAAAAArDA/pTErZTfycC0mMowqt15ljZuZCfOyeR6WwCLcB/s400/DSCN7971.JPG"
          alt=""
          className="logo"
        />
      </div>

      <h4 className="subtitulos">Para poder comenzar a jugar</h4>
      <div className="caja">
        <input
          type="text"
          data-testid="nombreJugadorInput"
          placeholder="Insertar nombre"
          value={nombreJugador}
          onChange={(e) => setNombreJugador(e.target.value)}
        />
        <br />
        <button
          data-testid="buttonJugador"
          onClick={() => handleCrearJugador()}
          className="btn btn-primary"
        >
          Crear Jugador
        </button>

        {mensajeRespuesta && <p className="mt-3">{mensajeRespuesta}</p>}
      </div>
    </div>
  );
}
export default CrearJugador;
