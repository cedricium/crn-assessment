import { useState, useEffect, useContext, useMemo, createContext } from 'react';
import useSWR from 'swr';

const GlobalStoreContext = createContext({});

export function GlobalStoreProvider(props) {
  const { data: shifts, error: shiftsError } = useSWR('/shifts');
  const { data: nurses, error: nursesError } = useSWR('/nurses');

  const [updatedShifts, setUpdatedShifts] = useState();
  useEffect(() => {
    shifts && setUpdatedShifts(shifts);
  }, [shifts]);

  const updateShift = (shiftId, nurseId) => {
    setUpdatedShifts((prev) => {
      const shiftsCopy = [...prev];
      const shiftIndex = shiftsCopy.findIndex((s) => s.id == String(shiftId));

      const shift = shiftsCopy[shiftIndex];
      shift.nurse_id = nurseId;

      shiftsCopy.splice(shiftIndex, 1, shift);

      return shiftsCopy;
    });
  };

  const value = useMemo(
    () => ({
      shifts: updatedShifts,
      nurses,
      shiftsError,
      nursesError,
      updateShift,
    }),
    [updatedShifts, shifts, nurses, updateShift],
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
