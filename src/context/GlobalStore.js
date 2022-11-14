import { useState, useEffect, useContext, useMemo, createContext } from 'react';
import useSWR from 'swr';

const GlobalStoreContext = createContext({});

export function GlobalStoreProvider(props) {
  const { data: shifts, error: shiftsError } = useSWR('/shifts');
  const { data: nurses, error: nursesError } = useSWR('/nurses');

  const [updatedShifts, setUpdatedShifts] = useState([]);
  useEffect(() => {
    shifts && setUpdatedShifts(shifts);
  }, [shifts, setUpdatedShifts]);

  const updateShift = (shiftId, nurseId) => {
    setUpdatedShifts((prev) =>
      prev.map((shift) => {
        if (String(shift.id) !== String(shiftId)) return shift;
        return { ...shift, nurse_id: nurseId };
      }),
    );
  };

  const value = useMemo(
    () => ({
      shifts: updatedShifts,
      nurses,
      shiftsError,
      nursesError,
      updateShift,
    }),
    [updatedShifts, shifts, nurses, shiftsError, nursesError, updateShift],
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
