import Partida from "../data/models/Partida";
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
    case Tipos.clearPartida:
      return {
        ...state,
        partida: Partida,
      };
    default:
      return state;
  }
};

export default storeReducer;
