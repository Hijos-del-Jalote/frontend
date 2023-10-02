import React, { useState } from "react";
import axios from "axios";

function RobarCarta({ idJugador, esTurno, cantidadCartasEnMano }) {
  //los estados del jugador y las cartas en null porque no tenemos informacion

  const recargarPagina = () => {
    // Recarga la página actual
    window.location.reload();
  };

  const handleDrawCard = async () => {
    try {
      //pido al back informacion

      // Se roba la carta y se actualiza
      const response = await axios.put(
        `http://localhost:8000/jugadores/${idJugador}/robar`
      );

      recargarPagina();
    } catch (error) {
      console.error("Error al robar una carta:", error);
    }
  };

  if (!esTurno || cantidadCartasEnMano == 5) {
    return <div></div>;
  }

  return (
    <div className="text-center mt-3">
      <button onClick={handleDrawCard} className="btn btn-primary">
        Robar Carta
      </button>
    </div>
  );
}

export default RobarCarta;
