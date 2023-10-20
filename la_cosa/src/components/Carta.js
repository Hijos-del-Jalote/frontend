import React from "react";

function CartaComponent({
  carta,
  esTurnoJugarCarta,
  esTurnoIntercambiarCarta,
  onClickEfectoLanzallama,
  onClickEfecto,
  onClickJugarCarta,
  onClickIntercambiarCarta,
}) {
  const onClick = () => {
    if (esTurnoJugarCarta) {
    if (carta.nombre === "Lanzallamas" || 
    carta.nombre === "Analisis" ||
    carta.nombre === "Sospecha" ||
    carta.nombre === "Whisky" ||
    carta.nombre === "Cambio de lugar" ||
    carta.nombre === "Mas vale que corras" ||
    carta.nombre === "Seduccion") {
      console.log("esLanza, alguna carta");
      onClickEfectoLanzallama(carta);
    } else {
      onClickJugarCarta(carta);
    }
  }
  if (esTurnoIntercambiarCarta) {
    onClickEfecto(carta);
  }
  };

  return (
    <div className="bg-info-subtle">
      {esTurnoJugarCarta || esTurnoIntercambiarCarta ? (
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
