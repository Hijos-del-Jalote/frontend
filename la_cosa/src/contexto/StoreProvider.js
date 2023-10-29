import React, { createContext, useEffect, useReducer, useState } from 'react';
import storeReducer from './StoreReducer';
import initialGlobalState from './GlobalState';
import localStorage from '../data/localStorage';
import Tipos from './Actions';
import { apiObtenerJugador, apiObtenerPartida } from '../data/apiService';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialGlobalState);

  async function fetchData() {
    const userId = localStorage.getUserId();
    const partidaId = localStorage.getMatchId();

    // Inicializar game aquí después de que userId se haya recuperado
    if (userId != null) {
      const jugador = await apiObtenerJugador(userId);
      if (jugador != null) {
        dispatch({ type: Tipos.setJugador, payload: jugador });
      }
    }

    if (partidaId != null) {
      const partida = await apiObtenerPartida(partidaId);
      if (partida != null) {
        dispatch({ type: Tipos.setPartida, payload: partida });
      }
    }
  }

  useEffect(() => {
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
