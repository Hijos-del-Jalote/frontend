import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useWebSocket } from './WebSocketContext';
import {useSearchParams } from "react-router-dom";


function Defensa({ jugadorActual}) {
  const [idCarta, setIdCarta] = useState('');
  const [players, setPlayers] = useState([]);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [modoDefensa, setModoDefensa] = useState(false); // Nuevo estado para controlar el modo defensa
  const [searchParams] = useSearchParams();
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");
  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws?idJugador=${idJugador}`; // borrar 
  const webSocket = useWebSocket(wsurl);
  
  useEffect(() => {
    
    if(webSocket){
        webSocket.onmessage = function(event){
            const data = JSON.parse(event.data);
            console.log("datos recibidos:", data);
            if(data.event === "jugar_carta"){
              console.log(`${data.idJugador} quiere jugar tal carta sobre tu jugador`);
                setPlayers(JSON.parse(data.data).jugadores);
            }
            if(data.event === "jugar_resp"){
                setPlayers(JSON.parse(data.data).jugadores);
                console.log(`${jugadorActual} quiere jugar defenderse del ataque`);
            }
            if(data.event === "fin_turno_jugar"){
                setPlayers(JSON.parse(data.data).jugadores)
            }
        }
    }
    const algunaCartaEsDefensa = jugadorActual.cartas.some(carta => carta.tipo === 'defensa');
    setModoDefensa(algunaCartaEsDefensa);
  }, [idCarta, webSocket]);

  const handleCartaSeleccionada = (carta) => {
    setCartaSeleccionada(carta);
  };

  const handleJugarCartaDefensa = () => {
    const mensaje = {
      //tipo: 'jugar_carta',
      defendido: true, // Marcar como defendida
      idCarta: cartaSeleccionada, // Reemplaza 123 con el ID de la carta correspondiente
    };

    // Emitir un evento WebSocket con el mensaje al servidor
    const mensajeJSON = JSON.stringify(mensaje);

    // Enviar el mensaje a través de WebSocket
    webSocket.send(mensajeJSON);
  };

  return (
    <div>
      
      {modoDefensa && (
  <div>
    <button onClick={handleJugarCartaDefensa}>Defender</button>
    <select onChange={() => handleCartaSeleccionada()}>
      <option value="">Selecciona una carta</option>
      {players
        .filter((carta) => carta.tipo === 'defensa')
        .map((carta, index) => (
          <option key={index} value={carta.id}>
            {carta.nombre} {/* Asume que cada carta tiene un nombre */}
          </option>
        ))}
    </select>
  </div>
)}
    </div>
  );
}

export default Defensa;