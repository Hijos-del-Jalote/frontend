import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { useWebSocket } from './WebSocketContext';
import {useSearchParams } from "react-router-dom";
import {actualizarPartida} from './Partida2';
import CartaComponent from "./Carta";


function Defensa({ jugadorActual}) {
  const [idCarta, setIdCarta] = useState('');
  const [players, setPlayers] = useState([]);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [modoDefensa, setModoDefensa] = useState(false); // Nuevo estado para controlar el modo defensa
  const [searchParams] = useSearchParams();
  const [mostrarBotones, ] = useState(false);
  //const [partida, setPartida] = useState(null);
  const [defender, setDefender] = useState(false); // Estado para rastrear si el jugador está defendiend
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");
  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws?idJugador=${idJugador}`; // borrar 
  const webSocket = useWebSocket(wsurl);
  
  const cartasData = jugadorActual.cartas;
  
  useEffect(() => {
    
    if(webSocket){
        webSocket.onmessage = function(event){
            const data = JSON.parse(event.data);
            console.log("datos recibidos:", data);
            if(data.event === "jugar_carta"){
                const datinha = JSON.parse(data.data)
                console.log(`${datinha.idJugador} quiere jugar ${datinha.template_carta} sobre ${datinha.idObjetivo}`);
                if(datinha.idObjetivo == idJugador){
                  setModoDefensa(true);
                }
            }
            if(data.event === "jugar_resp"){
                console.log(`${jugadorActual} quiere jugar defenderse del ataque`); 
                // este no se porque todavia no sabemos como lo pasa el back, pero solo avisa si se defendio o no
            }
            if(data.event === "fin_turno_jugar"){ // esto se rompe (ver por qué)
            //     actualizarPartida(JSON.parse(data.data))
            window.location.reload();
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
    if (modoDefensa) {
      setDefender(true);
    }
  };

  const handleNoDefender = () => {
    if (modoDefensa) {
      setDefender(false);
    }
  
  };
  const handleJugarCartaDefensa = (cartaSeleccionada) => {

      // Enviar la carta seleccionada al servidor a través de WebSocket
      const mensaje = {
        defendido: defender,
        idCarta: cartaSeleccionada.id,
      };

      const mensajeJSON = JSON.stringify(mensaje);
      webSocket.send(mensajeJSON);
    
  };
  return (//esto no se como hacer para que se vea bien hasta aca llegué
    
    <div className="row">
    {modoDefensa && (
    
      <div className="row justify-content-center">
        {cartasData.map((carta) => ( // esto esta copiado de partidaencurso, te deja seleccionar las cartas, se ve desfasado (hay que arreglar)
          <div className="col-md-auto" key={carta.id}>
              <CartaComponent
                esTurnoDefender={modoDefensa} // Indica que es un turno para jugar carta de defensa (ver componente Carta)
                carta={carta}
                onClickJugarCarta={handleJugarCartaDefensa} // se le pasa la funcion (esto creo que no hace nada, que se hace cuando apretas el boton, habria que pasar otra cosa, no se xd)
              />
            </div>
          ))}  
      </div>
        
    )}
    {modoDefensa && ( //todo esto esta asi nomas, se ve muy feo pero anda 
      <div>
      <button onClick={handleJugarCartaDefensa} className="btn btn-primary">Defender</button>
      <button onClick={handleJugarCartaDefensa} className="btn btn-primary">No defender</button>
      </div>
    )}
    </div>
  );
}

export default Defensa;