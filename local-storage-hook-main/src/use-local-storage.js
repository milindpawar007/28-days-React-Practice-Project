import { useState, useEffect } from "react";

export default function useLocalStorage(keyName, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(keyName);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Error reading localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(keyName, JSON.stringify(storedValue));
    } catch (error) {
      console.warn("Error writing to localStorage", error);
    }
  }, [keyName, storedValue]);

  return [storedValue, setStoredValue];
}
