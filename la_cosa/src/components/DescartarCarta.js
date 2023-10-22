import React  from "react";

function DescartarCarta({onClick }) {
  return (
    <div className="text-center mt-3">
      <button onClick={onClick} className="btn btn-primary">
        Descartar Carta
      </button>
    </div>
  );
}

export default DescartarCarta;
