import { useContext, useMemo, createContext } from 'react';
import useSWR from 'swr';

const GlobalStoreContext = createContext({});

export function GlobalStoreProvider(props) {
  const { data: shifts, error: shiftsError } = useSWR(
    'http://localhost:9001/shifts',
  );
  const { data: nurses, error: nursesError } = useSWR(
    'http://localhost:9001/nurses',
  );

  const value = useMemo(
    () => ({ shifts, nurses, shiftsError, nursesError }),
    [shifts, nurses],
  );
  return <GlobalStoreContext.Provider value={value} {...props} />;
}

export function useGlobalStore() {
  const context = useContext(GlobalStoreContext);
  if (!context) {
    throw new Error('Cannot access context outside of `GlobalStoreContext`!');
  }

  return context;
}
