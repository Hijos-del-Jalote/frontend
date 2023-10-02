import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FinalizarPartida({ idPartida }) {
    //inicializo como partida no terminada
  const [part_finalizada, setpart_Finalizada] = useState(false);
  const [ganadorId, setGanadorId] = useState(null);

  useEffect(() => {
    // Esta función se ejecutará automáticamente cuando el componente se monte
    handleFinalizarPartida();
  }, []);

  const handleFinalizarPartida = async () => {
    try {
    
      const response = await axios.get(`http://localhost:8000/partidas/estado?idPartida=${idPartida}`);
      // guardo la informacion 
      const data = response.data;
            //verifico el estado de la partida 
      if (data.finalizada) {
        setpart_Finalizada(true);
        setGanadorId(data.idGanador);
      }
    } catch (error) {
      console.error('Error al finalizar la partida:', error);
    }
  }

  return (
    <div>
      {part_finalizada ? (
        <p>La partida está finalizada. El ganador es el jugador con ID: {ganadorId}</p>
      ) : (
        <p>La partida se está finalizando...</p>
      )}
    </div>
  );
}

export default FinalizarPartida;

