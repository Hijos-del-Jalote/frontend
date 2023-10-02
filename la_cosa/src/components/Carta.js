import React from "react";

function CartaComponent({
  carta,
  esTurnoJugarCarta,
  onClickEfectoLanzallama,
  onClickJugarCarta,
}) {

  const onClick = () => {
    if (carta.nombre == "Lanzallamas") {
      console.log("esLanza");
      onClickEfectoLanzallama(carta);
    } else {
      onClickJugarCarta(carta);
    }
  };



  return (
    <div className="m-1">
      <button
        className={`btn btn-outline-primary ${
          esTurnoJugarCarta ? "" : "disabled"
        }`}
        onClick={onClick}
      >
        <div className="card" style={{ width: "12rem", height: "16rem" }}>
          <div className="card-body">
            <h5 className="card-title">{carta.nombre}</h5>
            <p className="card-text">{carta.descripcion}</p>
            <p className="card-text">Tipo: {carta.tipo}</p>
          </div>
        </div>
      </button>
    </div>
  );
}

export default CartaComponent;
