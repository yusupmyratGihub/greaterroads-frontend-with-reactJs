import { EncryptStorage } from "encrypt-storage";

console.log(process.env.REACT_APP_STORAGE_ENCRYPTION_KEY);

export const encryptedLocalStorage = new EncryptStorage(
  process.env.REACT_APP_STORAGE_ENCRYPTION_KEY
);

export const encryptedSessionStorage = new EncryptStorage(
  process.env.REACT_APP_STORAGE_ENCRYPTION_KEY,
  {
    storageType: "sessionStorage",
  }
);

export const setToLocalStorage = (key, value) => {
    encryptedLocalStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => {
    return encryptedLocalStorage.getItem(key);
};

export const removeFromLocalStorage = (key) => {
    encryptedLocalStorage.removeItem(key);
};

export const setToSessionStorage = (key, value) => {
    encryptedSessionStorage.setItem(key, value);
};

export const getFromSessionStorage = (key) => {
    return encryptedSessionStorage.getItem(key);
};

export const removeFromSessionStorage = (key) => {
    encryptedSessionStorage.removeItem(key);
};
