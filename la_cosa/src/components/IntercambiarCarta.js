import React, { useState } from "react";
import axios from "axios";

function IntercambiarCarta({ esTurno, cantidadCartasMano, onClick }) {
  const handleDrawCard = async () => {
    try {
      //pido al back informacion
      // Se roba la carta y se actualiza
      // const response = await axios.get(`http://localhost:8000/jugadores/${idJugador}/robar`);
    } catch (error) {
      console.error("Error al robar una carta:", error);
    }
  };

  return (
    <div className="text-center mt-3">
      <button onClick={onClick} className="btn btn-primary">
        Intercambiar Carta
      </button>
    </div>
  );
}

export default IntercambiarCarta;