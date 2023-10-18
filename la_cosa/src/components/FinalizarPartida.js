import React from 'react';

const FinalizarPartida = ({ isHumanoTeamWinner, winners }) => {
  let mensaje = '';
  let ganadoresMensaje = '';

  if (isHumanoTeamWinner) {
    mensaje = 'La partida termina porque los Humanos ganaron como equipo. Los ganadores son:';
  } else {
    mensaje = 'La partida termina porque La Cosa y los Infectados ganaron como equipo. Los ganadores son:';
  }

  if (winners.length > 0) {
    ganadoresMensaje = winners.map((jugador, index) => (
      <li key={index}>{`Jugador ${jugador}`}</li>
    ));
  }

  return (
    <div className="finalizar-partida">
      <h2>FIN DE LA PARTIDA</h2>
      <p>{mensaje}</p>
      <ul>
        {ganadoresMensaje}
      </ul>
    </div>
  );
};

export default FinalizarPartida;
