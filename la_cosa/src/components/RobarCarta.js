import React, { useState } from 'react';
import axios from 'axios';

function RobarCarta({idJugador}) {
    //los estados del jugador y las cartas en null porque no tenemos informacion 
  const [idJugador, setidJugador] = useState(null);
  const [carta, setCarta] = useState(null);
 
  const handleDrawCard = async () => {
    try {
        //pido al back informacion 
   
      const response = await axios.get(`http://localhost:8000/jugadores?id=${idJugador}/robar`);
      //response back: jugador y cartas
      const data = response.data;
      
      setidJugador(data.idJugador);
      setCarta(data.carta);
    } catch (error) {
      console.error('Error al robar una carta:', error);
    }
  }

  return (
    <div>
      <button onClick={handleDrawCard}>Robar Carta</button>
      {idJugador && carta && (
        <div>
          <p>Jugador: {idJugador}</p>
          <p>La carta fue robada, actualice la pagina</p>
        </div>
      )}
    </div>
  );
}

export default RobarCarta;

