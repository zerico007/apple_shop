import { useState, useEffect } from "react";

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
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
