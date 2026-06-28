import { createContext, useState } from 'react';

export const RefreshKeyContext = createContext(1);

export const RefreshKeyProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(1);

  return (
    <RefreshKeyContext.Provider value={{ refreshKey, setRefreshKey }}>
      {children}
    </RefreshKeyContext.Provider>
  );
}