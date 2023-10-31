// InfoPartida.js
import React from "react";
import "../styles/InfoPartida.css";
import LaCosaTerminaPartida from "./LaCosaTerminaPartida";
import handleLaCosaTerminaPartida from "./LaCosaTerminaPartida";

function InfoPartida({
  jugadorConTurnoActual,
  esTurno,
  sentido,
  partida,
  jugadorEnJuego,
  idJugador,
}) {
  return (
    <div className="container-info">
      <h5 className="titulo_info">Datos de la Partida</h5>
      <div className="item_info">
        <div className="item_title">Partida:</div> <div>{partida.nombre}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Tú eres:</div> <div>{jugadorEnJuego.nombre}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Turno Actual:</div> <div>{jugadorConTurnoActual.nombre}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Estado:</div>{" "}
        <div>{esTurno ? "Es tu turno" : "No es tu turno"}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Sentido:</div> <div>{sentido ? "Horario" : "Antihorario"}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Rol:</div> <div>{jugadorEnJuego.rol}</div>
      </div>

      {(jugadorEnJuego.rol === "La cosa") && (
          
          <LaCosaTerminaPartida 
          idJugador={idJugador}
          rol={jugadorEnJuego.rol}
          ></LaCosaTerminaPartida>
        )}

    </div>
  );
}

export default InfoPartida;
