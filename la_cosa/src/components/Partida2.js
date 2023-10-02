import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/Partida.css";
import PlayerComponent from "./Jugador";
import CartaComponent from "./Carta";
import RobarCarta from "./RobarCarta";
import JugarCarta from "./JugarCarta";

function Partida() {
  const [partida, setPartida] = useState(null);
  const [player, setPlayer] = useState(null);
  const [carta, setCarta] = useState(null);
  const [jugandoCarta, setJugandoCarta] = useState(false);
  const [habilitarSeleccionarOponente, setHabilitarSeleccionarOponente] =
    useState(false);
  const [oponente, setOponente] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idPartida = queryParams.get("idPartida");
  const idJugador = queryParams.get("idJugador");

  useEffect(() => {
    // Hacer una solicitud GET a http://localhost:8000/partidas/{idPartida} cuando el componente se monte
    axios
      .get(`http://localhost:8000/jugadores/${idJugador}`)
      .then((response) => {
        setPlayer(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la partida:", error);
      });

    axios
      .get(`http://localhost:8000/partidas/${idPartida}`)
      .then((response) => {
        setPartida(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la partida:", error);
      });
  }, [idPartida]);

  // Que muestre cargando mientras no se descargaron los datos
  if (!partida) {
    return <div>Cargando...</div>;
  }

  if (!player.isAlive) {
    return (
      <div className="contenedorPrincipal d-flex flex-column justify-content-center align-items-center">
        <div className="mt-5">
          <h2 className="text-danger">Te han eliminado...</h2>
          <p className="lead">Fin de la partida</p>
        </div>
      </div>
    );
  }

  const recargarPagina = () => {
    // Recarga la página actual
    window.location.reload();
  };

  // Variables locales para acceder a los datos más fácilmente
  const { nombre, iniciada, turnoActual, sentido, jugadores } = partida;

  const cartasData = player.cartas;

  // Ordeno a los jugadores por posicion
  const arrayJugadoresOrdenados = jugadores
    .slice()
    .sort((a, b) => a.posicion - b.posicion);
  let jugadorConTurnoActual = arrayJugadoresOrdenados[0];
  if (turnoActual != null) {
    jugadorConTurnoActual = arrayJugadoresOrdenados.find(
      (jugador) => jugador.posicion === turnoActual
    );
  }

  // Mostrar oponentes 
  const jugadoresFiltrados = arrayJugadoresOrdenados.filter(
    (jugador) => jugador.id != idJugador
  );

  

  const onJugarCarta = () => {
    setJugandoCarta(true);
  };

  
  const onClickEfectoLanzallama = (cartaAJugar) => {
    setHabilitarSeleccionarOponente(true);
    setCarta(cartaAJugar);
    console.log("dfsfdssd");
  };

  const onClickJugarCarta = async (cartaAJugar) => {
    // simplemente juega la carta
    // Jugar la carta
    try {
      const response = await axios.post(
        `http://localhost:8000/cartas/jugar?id_carta=${cartaAJugar.id}`
      );
      console.log("Carta jugada exitosamente");
      recargarPagina();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cartasData);

  const onSetOponente = async (opnenteAJugar) => {
    setOponente(opnenteAJugar);
    console.log(carta);
    try {
      const response = await axios.post(
        `http://localhost:8000/cartas/jugar?id_carta=${carta.id}&id_objetivo=${opnenteAJugar.id}`
      );
      console.log("Jugador eliminado exitosamente");
    } catch (error) {
      console.log(error);
    }
  };

  // obtengo mi jugador actual



  // Si la partida no esta iniciada que muestre que no esta iniciada
  if (iniciada == false || iniciada == null) {
    return <div>Partida no iniciada...</div>;
  }

  console.log(player);
  console.log(cartasData.length);
  const esTurno = idJugador == jugadorConTurnoActual.id;

  return (
    <div className="contenedorPrincipal">
      <h1>Partida: {nombre}</h1>
      <div className="contenedorJugadores">
        <h3>Oponentes:</h3>
        <ul className="listaJugadores">
          {jugadoresFiltrados.map((jugador, index) => (
            <li key={index} className="mt-3">
              <PlayerComponent
                player={jugador}
                seleccionarOponente={habilitarSeleccionarOponente}
                onSetOponente={onSetOponente}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="contenedor_mazo_y_descartes">
        <div className="contenedorMazo">
          <h5>Mazo</h5>

          <img
            src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png"
            alt="Mazo de cartas"
            style={{ width: "75px" }}
          />
        </div>
        <div className="contenedorDescartes">
          <h5>Pila de Descartes</h5>
          <img
            src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png"
            alt="Mazo de cartas"
            style={{ width: "75px" }}
          />
        </div>

        {/* Botones "Robar Carta" y "Jugar Carta" */}
        <div className="contenedorBotones">
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
        </div>
      </div>

      <div className="contenedorManoJugador">
        {/* Mostrar la mano del jugador actual */}
        <h3>Tu Mano: {player.nombre}</h3>
        <ul className="list-unstyled d-flex justify-content-start">
          {cartasData.map((carta) => (
            <li key={carta.id} className="mr-3">
              <CartaComponent
                esTurnoJugarCarta={jugandoCarta}
                carta={carta}
                onClickEfectoLanzallama={onClickEfectoLanzallama}
                onClickJugarCarta={onClickJugarCarta}
              ></CartaComponent>
            </li>
          ))}
        </ul>
      </div>
      <div className="contenedorInfo">
        {/* Mostrar información adicional de la partida */}
        <p>Turno Actual: {jugadorConTurnoActual.nombre}</p>
        <p> {esTurno ? "Es tu turno!" : "No es tu turno"}</p>
        <p>Sentido: {sentido ? "Horario" : "Antihorario"}</p>
      </div>
      <div>{jugandoCarta ? "Seleccione la carta que desea jugar" : ""}</div>
      <div>{habilitarSeleccionarOponente ? "a" : "b"}</div>
    </div>
  );
}

export default Partida;
