import { useState, useEffect, Dispatch, SetStateAction } from "react";

function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(
    () => JSON.parse(sessionStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

function getStoreFromSessionStorage() {
  if (sessionStorage.store) {
    return JSON.parse(sessionStorage.store);
  }
  return null;
}

export { usePersistedState, getStoreFromSessionStorage };
