// InfoPartida.js
import React from "react";

function InfoPartida({ jugadorConTurnoActual, esTurno, sentido }) {
  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-body d-flex flex-column justify-content-start">
          <h5 className="card-title">Información General</h5>
          <ul className="list-group list-group-flush mt-5">
            <li className="list-group-item">
              <strong>Turno Actual:</strong> {jugadorConTurnoActual.nombre}
            </li>
            <li className="list-group-item">
              <strong>Estado:</strong>{" "}
              {esTurno ? "Es tu turno" : "No es tu turno"}
            </li>
            <li className="list-group-item">
              <strong>Sentido:</strong> {sentido ? "Horario" : "Antihorario"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InfoPartida;
