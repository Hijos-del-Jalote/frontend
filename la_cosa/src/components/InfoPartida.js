// InfoPartida.js
import React from "react";

function InfoPartida({ jugadorConTurnoActual, esTurno, sentido, partida, jugadorEnJuego }) {
  return (
    <div className="container-fluid" style={{width: "250px"}}>
      <div className="card">
        <div className="card-header">Datos de la Partida</div>
        <ul className="list-group list-group-flush">
        <li className="list-group-item"><strong>Partida:</strong> {partida.nombre}</li>
        <li className="list-group-item"><strong>Tú eres:</strong> {jugadorEnJuego.nombre}</li>
          <li className="list-group-item"><strong>Turno Actual:</strong> {jugadorConTurnoActual.nombre}</li>
          <li className="list-group-item"><strong>Estado:</strong>{" "}
              {esTurno ? "Es tu turno" : "No es tu turno"}</li>
          <li className="list-group-item"><strong>Sentido:</strong> {sentido ? "Horario" : "Antihorario"}</li>
        </ul>
      </div>
    </div>
  );
}

export default InfoPartida;
