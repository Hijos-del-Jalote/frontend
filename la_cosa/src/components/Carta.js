import React from "react";

function CartaComponent({
  carta,
  descartandoCarta,
  jugandoCarta,
  onClickEfectoLanzallama,
  onClickJugarCarta,
  onDescartarCarta,
}) {
  const onClick = () => {
    if (carta.nombre === "Lanzallamas" && !descartandoCarta) {
      onClickEfectoLanzallama(carta);
    }
    else if (jugandoCarta) {
      onClickJugarCarta(carta);
    } else if (descartandoCarta) {
      onDescartarCarta(carta);
    } 
  };

  return (
    <div className="bg-info-subtle">
      {jugandoCarta || descartandoCarta ? (
        <button className="btn btn-outline-primary" onClick={onClick}>
          <div
            className="card bg-info-subtle"
            style={{ width: "10rem", height: "13.5rem" }}
          >
            <div className="card-body d-flex flex-column justify-content-around">
              <h5 className="card-title text-center">{carta.nombre}</h5>
              <p className="card-text text-center">{carta.descripcion}</p>
              <p className="card-text text-center text-primary">{carta.tipo}</p>
            </div>
          </div>
        </button>
      ) : (
        <div
          className="card bg-info-subtle"
          style={{ width: "10rem", height: "13.5rem" }}
        >
          <div className="card-body d-flex flex-column justify-content-around">
            <h5 className="card-title text-center">{carta.nombre}</h5>
            <p className="card-text text-center">{carta.descripcion}</p>
            <p className="card-text text-center text-primary">{carta.tipo}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartaComponent;
