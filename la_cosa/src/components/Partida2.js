import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import "../styles/Partida.css";
import PlayerComponent from "./Jugador";
import CartaComponent from "./Carta";
import RobarCarta from "./RobarCarta";
import JugarCarta from "./JugarCarta";
import InfoPartida from "./InfoPartida";

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
      })
      .catch((error) => {
        console.error("Error al obtener la partida:", error);
      });

    axios
      .get(`http://localhost:8000/partidas/${idPartida}`)
      .then((response) => {
        setPartida(response.data);
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
    (jugador) => jugador.id != idJugador && jugador.isAlive == 1
  );

  if (jugadoresFiltrados.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="alert alert-success text-center animated fadeIn"
          role="alert"
        >
          Partida Finalizada, ¡eres el ganador!
        </div>
      </div>
    );
  }

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

  const onSetOponente = async (opnenteAJugar) => {
    setOponente(opnenteAJugar);
    console.log("Carta a jugar");
    console.log(carta);
    console.log("Oponente a jugar");
    console.log(opnenteAJugar);
    try {
      const response = await axios.post(
        `http://localhost:8000/cartas/jugar?id_carta=${carta.id}&id_objetivo=${opnenteAJugar.id}`
      );
      console.log("Jugador eliminado exitosamente");
      recargarPagina();
    } catch (error) {
      console.log(error);
    }
  };

  // obtengo mi jugador actual

  // Si la partida no esta iniciada que muestre que no esta iniciada
  if (iniciada == false || iniciada == null) {
    return <div>Partida no iniciada...</div>;
  }

  const esTurno = idJugador == jugadorConTurnoActual.id;
  return (
    <div className="d-flex flex-column vh-100" id="contenedor-principal">
      <div
        className="d-flex justify-content-between partida-container bg-dark p-4 text-center w-100"
        id="contenedor-titulo"
      >
        {/* Titulo de la partida */}
        <h1 className="text-white display-8 align-self-center">
          Eres {player.nombre}
        </h1>

        <h1 className="text-white display-4 align-self-left">
          Partida {nombre}
        </h1>
        <div></div>
      </div>

      <div id="contenedor-relleno" className="d-flex flex-grow-1 m-2 h-100">
        <div id="contenedor-info" className="h-100 border border-secondary">
          <InfoPartida
            jugadorConTurnoActual={jugadorConTurnoActual}
            esTurno={esTurno}
            sentido={sentido}
          />
        </div>
        <div id="contenedor-game" className=" d-flex flex-column w-100 h-100 ">
          <div id="oponentes-div" className="d-flex flex-column">
            <div
              id="tarjetas-oponentes"
              className="d-flex flex-row justify-content-center"
            >
              {jugadoresFiltrados.map((jugador, index) => (
                <div key={index} className="mb-2">
                  <PlayerComponent
                    player={jugador}
                    seleccionarOponente={habilitarSeleccionarOponente}
                    onClick={onSetOponente}
                  />
                </div>
              ))}
            </div>
          </div>
          <div id="mazo-div" className="d-flex justify-content-center">
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
          <div id="mano-div">
            <div className="contenedorManoJugador">
              {/* Mostrar la mano del jugador actual */}
              <h3 className="text-center">Mano actual</h3>
              <ul className="list-unstyled d-flex justify-content-center">
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
          </div>
        </div>
        {/* Otras columnas aquí, si es necesario */}
      </div>
    </div>
  );
}

export default Partida;
