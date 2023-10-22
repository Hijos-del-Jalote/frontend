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
  const [cartasDefensa, setCartasDefensa] = useState([]);
  const [modoDefensa, setModoDefensa] = useState(false); // Nuevo estado para controlar el modo defensa
  const [searchParams] = useSearchParams();
  const [mostrarBotones, ] = useState(false);
  //const [partida, setPartida] = useState(null);
  const [defender, setDefender] = useState(false); // Estado para rastrear si el jugador está defendiend
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");
  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws?idJugador=${idJugador}`; // borrar 
  const webSocket = useWebSocket(wsurl);
  const [estadoPartida, setEstadoPartida] = useState("");

  const cartasData = jugadorActual.cartas;

  useEffect(() => {
    
    if(webSocket){
        webSocket.onmessage = function(event){
            const data = JSON.parse(event.data);
            console.log("datos recibidos:", data);
            if(data.event === "jugar_carta"){
                const datinha = JSON.parse(data.data)
                
                if (idJugador != datinha.idJugador) {
                    setEstadoPartida(`${datinha.nombreJugador} quiere jugar ${datinha.template_carta} sobre ${datinha.nombreObjetivo}`);
                }
                
                if(datinha.idObjetivo == idJugador){
                  var nuevasCartasDefensa = [];
                  // var nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.tipo.toLowerCase() === 'defensa');
                  if (datinha.template_carta === "Lanzallamas") {
                    nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.tipo.toLowerCase() === 'defensa');
                    nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.nombre === "Nada de barbacoas");
                  }
                  if (datinha.template_carta === "Cambio de lugar" || datinha.template_carta === "Mas vale que corras") {
                    nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.tipo.toLowerCase() === 'defensa');
                    nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.nombre === "Aqui estoy bien");
                  }

                  setCartasDefensa(nuevasCartasDefensa);
                  console.log(cartasDefensa);
                  if (cartasDefensa == []) {
                      setEstadoPartida("No tienes con que defenderte");
                  }
                  console.log();
                  setModoDefensa(true);
                }
            }
            if(data.event === "jugar_resp"){
              
                if (idJugador != jugadorActual) {
                    setEstadoPartida(`${data.data.nombreJugador} quiere jugar defenderse del ataque`); 
                }// este no se porque todavia no sabemos como lo pasa el back, pero solo avisa si se defendio o no
            }
            if(data.event === "fin_turno_jugar"){ // esto se rompe (ver por qué)
            //     actualizarPartida(JSON.parse(data.data))
            setEstadoPartida(`${data.data.nombreJugador} terminó de jugar carta`)
            window.location.reload();
            }
            if(data.event === "defensa_erronea"){
              setEstadoPartida(`Elige una carta de defensa valida`);
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
        {cartasDefensa.map((carta) => ( // esto esta copiado de partidaencurso, te deja seleccionar las cartas, se ve desfasado (hay que arreglar)
          <div className="col-md-auto" key={carta.id}>
              {defender && (<CartaComponent
                esTurnoDefender={modoDefensa} // Indica que es un turno para jugar carta de defensa (ver componente Carta)
                carta={carta}
                onClickJugarCarta={handleJugarCartaDefensa} // se le pasa la funcion (esto creo que no hace nada, que se hace cuando apretas el boton, habria que pasar otra cosa, no se xd)
              />)}
            </div>
          ))}  
      </div>
        
    )}
    
    {modoDefensa && ( //todo esto esta asi nomas, se ve muy feo pero anda 
      <div>
      <button onClick={handleDefender} className="btn btn-primary">Defender</button>
      <button onClick={handleJugarCartaDefensa} className="btn btn-primary">No defender</button>
      </div>
    )}
        {
          
        <div className="col-md-auto mt-3">
          <h5>{estadoPartida}</h5>
          
        </div>
      }
    </div>
  );
}

export default Defensa;