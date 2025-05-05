import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state with localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - initial value
 * @returns {Array} - [storedValue, setValue] tuple
 */
function useLocalStorage(key, initialValue) {
  // Get the initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse the stored JSON or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when the storedValue changes
  useEffect(() => {
    try {
      // Allow initialValue to be a function
      const valueToStore = storedValue instanceof Function 
        ? storedValue(storedValue) 
        : storedValue;
      
      // Save state to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      
      // Save state
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error);
    }
  };

  // Return the stored value and the setter function
  return [storedValue, setValue];
}

export default useLocalStorage;