import React, { useState } from "react";
import PlayerComponent from "./Jugador";
import axios from "axios";
import CartaComponent from "./Carta";
import RobarCarta from "./RobarCarta";
import JugarCarta from "./JugarCarta";
import DescartarCarta from "./DescartarCarta";
import "../styles/PartidaEnCurso.css";

function PartidaEnCurso({ oponentes, jugadorActual, esTurno, idJugador }) {
  const [habilitarSeleccionarOponente, setHabilitarSeleccionarOponente] =
    useState(false);
  const [carta, setCarta] = useState(null);
  const [jugandoCarta, setJugandoCarta] = useState(false);
  const [descartandoCarta, setDescartandoCarta] = useState(false);
  const cartasData = jugadorActual.cartas;


  // Metodos del componente

  // aprieta un lanzallamas
  const onClickEfectoLanzallama = (cartaAJugar) => {
    setHabilitarSeleccionarOponente(true);
    setCarta(cartaAJugar);
  };

  const onJugarCarta = () => {
    setJugandoCarta(true);
  };

  const onClickDescartarCarta = async (cartaADescartar) => {
    // simplemente juega la carta
    // Jugar la carta
    try {
      console.log(cartaADescartar)
      await axios.put(
        `http://localhost:8000/cartas/descartar_carta/${cartaADescartar.id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onClickJugarCarta = async (cartaAJugar) => {
    // simplemente juega la carta
    // Jugar la carta
    try {
      await axios.post(
        `http://localhost:8000/cartas/jugar?id_carta=${cartaAJugar.id}`
      );
      console.log("Carta jugada exitosamente");
    } catch (error) {
      console.log(error);
    }
  };

  const onDescartarCarta = async () => {
    setDescartandoCarta(true);
  };


  const onSetOponente = async (opnenteAJugar) => {
    console.log("Carta a jugar");
    console.log(carta);
    console.log("Oponente a jugar");
    console.log(opnenteAJugar);
    try {
      await axios.post(
        `http://localhost:8000/cartas/jugar?id_carta=${carta.id}&id_objetivo=${opnenteAJugar.id}`
      );
      console.log("Jugador eliminado exitosamente");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container_partida_encurso">
      <div className="jugadores_cards">
        {oponentes.map((jugador) => (
          <div className="player_card" key={jugador.id}>
            <PlayerComponent
              player={jugador}
              seleccionarOponente={habilitarSeleccionarOponente}
              onClick={onSetOponente}
            />
          </div>
        ))}
      </div>


      <div className="mazo_container">
        <div className="mazo">
          <h5>Mazo</h5>

          <img
            src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png"
            alt="Mazo de cartas"
            style={{ width: "75px" }}
          />
        </div>
        <div className="mazo">
          <h5>Descartes</h5>
          <img
            src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png"
            alt="Mazo de cartas"
            style={{ width: "75px" }}
          />
        </div>
        <div className="botones_juego">
          {esTurno && cartasData.length === 4 && (
            <RobarCarta
              idJugador={idJugador}
              esTurno={esTurno}
              cantidadCartasEnMano={cartasData.length}
            ></RobarCarta>
          )}

          {esTurno && cartasData.length === 5 && (!jugandoCarta && !descartandoCarta) && (
            <JugarCarta
              esTurno={esTurno}
              onClick={onJugarCarta}
              cantidadCartasEnMano={cartasData.length}
            ></JugarCarta>
            
          )}
          {esTurno && cartasData.length === 5 && (!jugandoCarta && !descartandoCarta) && (
            <DescartarCarta onClick={onDescartarCarta}></DescartarCarta>
            
          )}
          {jugandoCarta && !habilitarSeleccionarOponente && (
            <div>Selecciona una carta para jugar</div>
          )}
          {descartandoCarta &&  (
            <div>Selecciona una carta para descartar</div>
          )}
          {habilitarSeleccionarOponente && (
            <div>Selecciona un oponente </div>
          )}
        </div>
      </div>


      <div className="mano">
        {/* Mostrar la mano del jugador actual */}
        <h3 className="">Mano actual</h3>
        <div className="cartas_mano">
          {cartasData.map((carta) => (
            <div className="carta_mano" key={carta.id}>
              <CartaComponent
                jugandoCarta={jugandoCarta}
                descartandoCarta={descartandoCarta}
                carta={carta}
                onClickEfectoLanzallama={onClickEfectoLanzallama}
                onClickJugarCarta={onClickJugarCarta}
                onDescartarCarta={onClickDescartarCarta}
              ></CartaComponent>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartidaEnCurso;
