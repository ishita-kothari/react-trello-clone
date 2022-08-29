import React, { createContext, useState } from "react";

type StorageProviderProps = {
  children: React.ReactNode;
};

type StorageContextType = {
  get: (key: string) => {
    title: string;
    cards: {
         id: number,
          desc: string,
           comments: string[],
           labels: string[]
    }[];
    id: number;
  }[];
  set: (key: string, value: {}[]) => void;
};

const storageKey = "trelloData";

const defaults = JSON.stringify({});

const StorageContext = createContext<StorageContextType>({
  get: () => [
    {
      title: "To Do",
      id: 0,
      cards: [
        {
          id: 0,
          desc: "Task 1",
          comments: [],
          labels: [],
        },
        {
          id: 1,
          desc: "Task 2",
          comments: [],
          labels: [],
        },
      ],
    },
  ],
  set: (key = "trelloData", value = [{}]) => null,
});

const StorageConsumer = StorageContext.Consumer;

const parseStorage = () => {
  // const localStorage = typeof window !== 'undefined' ? window.localStorage : { getItem: () => (defaults) };

  try {
    return JSON.parse(localStorage.getItem(storageKey) || defaults);
  } catch (err) {
    localStorage.setItem(storageKey, JSON.stringify(defaults));
    return {};
  }
};

const stringifyStorage = (value: {}[]) => {
  // const localStorage = typeof window !== 'undefined' ? window.localStorage : { getItem: () => (defaults), setItem: () => ({}) };

  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (err) {
    localStorage.setItem(storageKey, JSON.stringify(defaults));
  }
};

const StorageProvider = ({ children }: StorageProviderProps) => {
  const [storage, setStorage] = useState(parseStorage());
  const get = (key: string) => storage[key];
  const set = (key: string, value: {}[]) => {
    console.log("sert");

    const newStorage = { ...storage, [key]: value };
    stringifyStorage(newStorage);
    setStorage(newStorage);
  };

  return (
    <StorageContext.Provider value={{ get, set }}>
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext, StorageConsumer };

export default StorageProvider;
