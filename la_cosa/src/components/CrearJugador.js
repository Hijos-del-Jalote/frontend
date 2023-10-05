import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { apiCrearJugador } from "./apiService";

function CrearJugador() {
  const navigate = useNavigate();

  const [nombreJugador, setNombreJugador] = useState("");
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");

  const handleCrearJugador = async () => {

    const response = await apiCrearJugador(nombreJugador);
    if (response.success){
      setMensajeRespuesta("Jugador creado exitosamente, redirigiendo al inicio ...");
      setTimeout(() => {
        navigate(`/home/crear?idJugador=${response.playerId}`);
      }, 2000)
    }else {
      setMensajeRespuesta(response.message);

      // Si pasa algo que me lo muestre en consola
      if (response.error != null) {
        console.log(response.error);
      }
    }
  };
  return (
<div className="container text-center" >
  <h1 className="welcome">¡Bienvenidos al juego La Cosa!</h1>
  <div className="img">
    <img
      src="https://1.bp.blogspot.com/-CdbElErUVhY/WM1FKf5iynI/AAAAAAAArDA/pTErZTfycC0mMowqt15ljZuZCfOyeR6WwCLcB/s400/DSCN7971.JPG"
      alt="Logo del juego"
      className="logo"
    />
  </div>

  <h4 className="subtitulos">Para comenzar a jugar:</h4>
  <div className="caja">
    <input
      type="text"
      data-testid="nombreJugadorInput"
      placeholder="Insertar nombre"
      value={nombreJugador}
      onChange={(e) => setNombreJugador(e.target.value)}
      className="form-control"
    />
    <br />
    <button
      data-testid="buttonJugador"
      onClick={() => handleCrearJugador()}
      className="btn btn-primary"
    >
      Crear Jugador
    </button>

    {mensajeRespuesta && (
      <p className="mt-3 alert alert-info">{mensajeRespuesta}</p>
    )}
  </div>
</div>

  );
}
export default CrearJugador;
