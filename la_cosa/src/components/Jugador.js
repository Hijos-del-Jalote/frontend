import React from "react";

function PlayerComponent({ player, seleccionarOponente, onSetOponente }) {
  return (
    <div className="card m-2 p-1">
          <button
        className={`btn btn-outline-primary ${seleccionarOponente ? "" : "disabled"}`}
          // onClick={onSetOponente(player)}
      >
      <div className="card-body d-flex flex-column align-items-center">
        <img
          src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
          className="card-img-top mb-3"
          alt="Imagen del jugador"
          style={{ width: "100px" }}
        />
        <h5 className="card-title">{player.nombre}</h5>
        <p className="card-text">Posición: {player.posicion}</p>
      </div></button>
    </div>
  );
}

export default PlayerComponent;
