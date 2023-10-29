import Tipos from "./Actions";

const storeReducer = (state, action) => {
  switch (action.type) {
    case Tipos.setJugador:
      return {
        ...state,
        jugador: action.payload,
      };
    case Tipos.setPartida:
      return {
        ...state,
        partida: action.payload,
      };
    default:
      return state;
  }
};

export default storeReducer;
