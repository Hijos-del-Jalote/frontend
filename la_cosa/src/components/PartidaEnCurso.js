import React, { useState } from "react";
import PlayerComponent from "./Jugador";
import axios from "axios";
import CartaComponent from "./Carta";
import RobarCarta from "./RobarCarta";
import JugarCarta from "./JugarCarta";
import Defensa from "./Defender";
import IntercambiarCarta from "./IntercambioCarta";
import ResponderIntercambio from "./ResponderIntercambio";
import { useWebSocket } from './WebSocketContext';
import {useSearchParams } from "react-router-dom";

function PartidaEnCurso({ oponentes, jugadorActual, esTurno, idJugador }) {
  const [habilitarSeleccionarOponente, setHabilitarSeleccionarOponente] =
    useState(false);
  const [carta, setCarta] = useState(null);
  const [jugandoCarta, setJugandoCarta] = useState(false);
  const [intercambiandoCarta, setIntercambiandoCarta] = useState(false);
  const cartasData = jugadorActual.cartas;
  const [searchParams] = useSearchParams();
  const idPartida = searchParams.get("idPartida");
  const [modoElegirCarta, setModoElegirCarta] = useState(false);
  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws?idJugador=${idJugador}`; // borrar 
  const webSocket = useWebSocket(wsurl);
  // Metodos del componente

  // aprieta un lanzallamas
  const onClickEfectoLanzallama = (cartaAJugar) => {
    console.log("dfsfdssd");
    setHabilitarSeleccionarOponente(true);
    setCarta(cartaAJugar);
    console.log("dfsfdssd");
  };

  const onJugarCarta = () => {
    setJugandoCarta(true);
  };

  const onIntercambiarCarta = () => {
    //setHabilitarSeleccionarOponente(true);
    console.log("AAAA");
    setIntercambiandoCarta(true);
  };

  const onClickJugarCarta = async (cartaAJugar) => {
    // simplemente juega la carta
    // Jugar la carta
    console.log("AAAA");
    try {
      await axios.post(
        `http://localhost:8000/cartas/jugar?id_carta=${cartaAJugar.id}`
      );
      console.log("Carta jugada exitosamente");
      recargarPagina();
    } catch (error) {
      console.log(error);
    }
  };
 
  const onSetOponente = async (opnenteAJugar) => {
    console.log("Carta a jugar");
    console.log(carta);
    console.log("Oponente a jugar");
    console.log(opnenteAJugar);
    try {
      if (!intercambiandoCarta) {
        await axios.post(
          `http://localhost:8000/cartas/jugar?id_carta=${carta.id}&id_objetivo=${opnenteAJugar.id}`
        );
      }
      if (intercambiandoCarta) {
        await axios.put(
          `http://localhost:8000/cartas/${carta.id}/intercambiar?idObjetivo=${opnenteAJugar.id}`
        );
      }
      console.log("Jugador eliminado exitosamente");
      recargarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  const recargarPagina = () => {
    // Recarga la página actual
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {oponentes.map((jugador) => (
          <div className="col-md-auto" key={jugador.id}>
            <PlayerComponent
              player={jugador}
              seleccionarOponente={habilitarSeleccionarOponente}
              onClick={onSetOponente}
            />
          </div>
        ))}
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h5>Mazo</h5>

          <img
            src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png"
            alt="Mazo de cartas"
            style={{ width: "75px" }}
          />
        </div>
        <div className="col-md-auto">
          <h5>Pila de Descartes</h5>
          <img
            src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png"
            alt="Mazo de cartas"
            style={{ width: "75px" }}
          />
        </div>
        <div className="col-md-auto">
          
          {esTurno && cartasData.length === 4 && (
            <RobarCarta
              idJugador={idJugador}
              esTurno={esTurno}
              cantidadCartasEnMano={cartasData.length}
            ></RobarCarta>
          )}

          {esTurno && cartasData.length === 5 && !jugandoCarta && (
            <JugarCarta
              esTurno={esTurno}
              onClick={onJugarCarta}
              cantidadCartasEnMano={cartasData.length}
            ></JugarCarta>
          )}

          
            
          

          {jugandoCarta && !habilitarSeleccionarOponente && (
            <div>Selecciona una carta para jugar</div>
          )}
          {habilitarSeleccionarOponente && (
            <div>Selecciona una carta para jugar</div>
          )}
          <Defensa 
          jugadorActual={jugadorActual}
          webSocket={webSocket}>
          </Defensa>
          
          {esTurno && cartasData.length === 4 && !intercambiandoCarta && (
            <IntercambiarCarta 
              esTurno={esTurno}
              onClick={onIntercambiarCarta}
              cantidadCartasEnMano={cartasData.length} >
            </IntercambiarCarta>
          )}
        </div>
      </div>
      <div className="row">
        {/* Mostrar la mano del jugador actual */}
        <h3 className="text-center">Mano actual</h3>
        <div className="row justify-content-center">
          {cartasData.map((carta) => (
            <div className="col-md-auto" key={carta.id}>
              <CartaComponent
                esTurnoJugarCarta={jugandoCarta}
                esTurnoIntercambiarCarta={intercambiandoCarta}
                carta={carta}
                onClickEfectoLanzallama={onClickEfectoLanzallama}
                onClickJugarCarta={onClickJugarCarta}
                onClickIntercambiarCarta={onClickEfectoLanzallama}
              ></CartaComponent>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartidaEnCurso;
