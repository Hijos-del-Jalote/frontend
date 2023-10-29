import React, { createContext, useEffect, useReducer } from 'react';
import storeReducer from './StoreReducer';
import initialGlobalState from './GlobalState';
import localStorage from '../data/localStorage';
import Game from '../Game';
import Tipos from './Actions';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const game = Game();
  const [store, dispatch] = useReducer(storeReducer, initialGlobalState);

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getUserId();
      const partidaId = localStorage.getMatchId();
      console.log(partidaId)
      if (userId != null) {
        
        const jugador = await game.getJugador(userId);
        if (jugador != null) {
          dispatch({ type: Tipos.setJugador, payload: jugador });
        }
      }

      if(partidaId != null) {
        const partida = await game.getPartida(partidaId);
        if (partida != null) {
          dispatch({ type: Tipos.setPartida, payload: partida });
        }
      }
    }
    fetchData();
  }, []);
  

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default StoreProvider;
