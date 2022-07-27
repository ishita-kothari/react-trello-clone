import React, { createContext, useState } from 'react';

const storageKey = 'trelloData';

const defaults = JSON.stringify({});

const StorageContext = createContext({});

const StorageConsumer = StorageContext.Consumer;

const parseStorage = () => {
    const localStorage = typeof window !== 'undefined' ? window.localStorage : { getItem: () => (defaults) };

    try {
        return JSON.parse(localStorage.getItem(storageKey) || defaults);
    } catch (err) {
        localStorage.setItem(storageKey, JSON.stringify(defaults));
        return {};
    }
};

const stringifyStorage = (value) => {
    const localStorage = typeof window !== 'undefined' ? window.localStorage : { setItem: () => (defaults) };

    try {
        localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (err) {
        localStorage.setItem(storageKey, JSON.stringify(defaults));
    }
};

const StorageProvider = ({ children }) => {
    const [storage, setStorage] = useState(parseStorage());
    const get = (key) => storage[key];
    const set = (key, value) => {
        
        const newStorage = { ...storage, [key]: value };
        stringifyStorage(newStorage);
        setStorage(newStorage);
    };

    return <StorageContext.Provider value={{ get, set }}>{children}</StorageContext.Provider>;
};

export { StorageProvider, StorageContext, StorageConsumer };

export default StorageProvider;
