import React, { createContext, useReducer } from 'react';
import storeReducer from './StoreReducer';
import initialGlobalState from './GlobalState';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {

  const [store, dispatch] = useReducer(storeReducer, initialGlobalState);

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default StoreProvider;
