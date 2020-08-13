import React, { createContext, useState } from 'react';

export const StoreContext = createContext(null);

export function StoreContextProvider({ children, initialState }) {
  // eslint-disable-next-line
  const [state, setState] = useState(initialState);

  return (
    <StoreContext.Provider
      value={state}
    >
      {children}
    </StoreContext.Provider>
  );
}
