import React from "react";

function PlayerComponent({ player, seleccionarOponente, onClick }) {
  return (
    <div className="card" style={{width: "150px"}}>
      {seleccionarOponente ? (
        <button
          className={`btn btn-outline-primary ${
            seleccionarOponente ? "" : "disabled"
          }`}
          onClick={() => onClick(player)}
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
          </div>
        </button>
      ) : (
          <div className="card-body d-flex flex-column align-items-center">
            <img
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
              className="card-img-top mb-3"
              alt="Imagen del jugador"
              style={{ width: "100px" }}
            />
            <h5 className="card-title">{player.nombre}</h5>
            <p className="card-text">Posición: {player.posicion}</p>
          </div>

      )}

    </div>
  );
}

export default PlayerComponent;
