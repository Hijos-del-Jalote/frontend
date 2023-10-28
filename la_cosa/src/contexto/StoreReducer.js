import Tipos from "./Actions";





  const storeReducer = (state, action) => {
    switch (action.type) {
      case Tipos.cambiarNombreJugador:
        return {
          ...state,
          nombreJugador: action.payload,
        }
      default:
        return state;
    }
  };

  export default storeReducer;