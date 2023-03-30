import { useState } from 'react';

// ! I didn't use this, but seems like a useful use hook for future use
const getLocalStorage = (key: string) => {
  const storage = localStorage.getItem(key);
  if (!storage) {
    return {};
  }
  //@ts-ignore
  // I don't know why, but JSON.parse is not being recognized as
  return JSON.parse(storage);
};

const useLocalStorage = (key: string) => {
  const currentKey = key;
  const [storage, setStorage] = useState(getLocalStorage(key));

  // Sets storage, and updates state
  const setLocalStorage = (data: any) => {
    //@ts-ignore
    // Set item into the storage, and update state
    const currentStorage = JSON.parse(localStorage.getItem(currentKey));

    // If currentStorage does not exist return only data
    if (!currentStorage) {
      localStorage.setItem(currentKey, JSON.stringify({ data }));
    }

    // If currentStorage exists
    if (currentStorage) {
      localStorage.setItem(
        currentKey,
        JSON.stringify({ data: { ...currentStorage.data, ...data } })
      );
    }

    setStorage({ data: { ...currentStorage.data, ...data } });
  };

  // Remove items, and clears useState
  const removeItem = () => {
    localStorage.removeItem(currentKey);
    setStorage({});
  };

  // Converts data to readable array form to return react readable state
  const convertToArray = (): any[] => {
    const output = [];

    for (const key in storage.data) {
      output.push(storage.data[key]);
    }

    return output;
  };

  return [storage, setLocalStorage, removeItem, convertToArray] as const;
};

export default useLocalStorage;
