import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { useWebSocket } from './WebSocketContext';
import {useSearchParams } from "react-router-dom";
import {actualizarPartida} from './Partida2';


function Defensa({ jugadorActual}) {
  const [idCarta, setIdCarta] = useState('');
  const [players, setPlayers] = useState([]);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [modoDefensa, setModoDefensa] = useState(false); // Nuevo estado para controlar el modo defensa
  const [searchParams] = useSearchParams();
  //const [partida, setPartida] = useState(null);
  const [defender, setDefender] = useState(false); // Estado para rastrear si el jugador está defendiend
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
                console.log(`${data.idJugador} quiere jugar ${data.template_carta} sobre ${idJugador}`);
                setModoDefensa(true);
            }
            if(data.event === "jugar_resp"){
                console.log(`${jugadorActual} quiere jugar defenderse del ataque`); 
                // este no se porque todavia no sabemos como lo pasa el back, pero solo avisa si se defendio o no
            }
            if(data.event === "fin_turno_jugar"){
                actualizarPartida(JSON.parse(data.data))
            }
            if(data.event === "defensa_erronea"){
              console.log(`Elige una carta de defensa valida`);
              setModoDefensa(true);
            }
        }
    }
    //const algunaCartaEsDefensa = jugadorActual.cartas.some(carta => carta.tipo === 'defensa');
    //setModoDefensa(algunaCartaEsDefensa);
  }, [idCarta, webSocket]);

  const handleCartaSeleccionada = (carta) => {
    setCartaSeleccionada(carta);
  };
  const handleDefender = () => {
    setDefender(true);
  };

  const handleNoDefender = () => {
    setDefender(false);
  };
  const handleJugarCartaDefensa = () => {
    const mensaje = {
      //tipo: 'jugar_carta',
      defendido: defender, // Marcar como defendida
      idCarta: cartaSeleccionada, // Reemplaza 123 con el ID de la carta correspondiente
    };

    // Emitir un evento WebSocket con el mensaje al servidor
    const mensajeJSON = JSON.stringify(mensaje);

    // Enviar el mensaje a través de WebSocket
    webSocket.send(mensajeJSON);
  };

  return (
    <div>
    <div>
      <button onClick={handleDefender}>Defender</button>
      <button onClick={handleNoDefender}>No Defender</button>
    </div>

    {modoDefensa && defender && (
      <div>
        <select onChange={handleCartaSeleccionada}>
          <option value="">Selecciona una carta</option>
          {players
            .filter((carta) => carta.tipo === 'defensa' && (carta.nombre === "Aqui estoy bien" || carta.nombre === "Nada de barbacoas"))
            .map((carta, index) => (
              <option key={index} value={carta.id}>
                {carta.nombre}
              </option>
            ))}
        </select>
        <button onClick={handleJugarCartaDefensa}>Jugar Carta de Defensa</button>
      </div>
    )}
  </div>
  );
}

export default Defensa;