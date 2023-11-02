// InfoPartida.js
import React from "react";
import "../styles/InfoPartida.css";

function InfoPartida({
  jugadorConTurnoActual,
  esTurno,
  sentido,
  partida,
  jugadorEnJuego,
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
        <div className="item_title">Turno Actual:</div> <div>{jugadorConTurnoActual ? jugadorConTurnoActual.nombre : ""}</div>
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
    </div>
  );
}

export default InfoPartida;
