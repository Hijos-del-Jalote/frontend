import React from "react";

const FinalizarPartida = ({ isHumanoTeamWinner, winners }) => {
  let mensaje = "";
  let ganadoresMensaje = "";

  if (isHumanoTeamWinner) {
    mensaje =
      "La partida termina porque los Humanos ganaron como equipo. Los ganadores son:";
  } else {
    mensaje =
      "La partida termina porque La Cosa y los Infectados ganaron como equipo. Los ganadores son:";
  }

  if (winners.length > 0) {
    ganadoresMensaje = winners.map((jugador, index) => (
      <li
        className="list-group-item justify-content-between align-items-start "
        key={index}
      >
      
      <div className="ms-2 me-auto">
      <div className="fw-bold ">{`Jugador ${jugador}`}</div>
      "Rol final"
    </div>

      </li>
    ));
  }

  return (
    <div className="text-center  container h-100">
      <h2 className="">FIN DE LA PARTIDA</h2>
      <p>{mensaje}</p>
      <ol className="list-group text-center">{ganadoresMensaje}</ol>
    </div>
  );
};

export default FinalizarPartida;
