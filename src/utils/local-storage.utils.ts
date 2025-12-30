import { LOCAL_STORAGE_KEYS } from "../constants/local-storage.constant";

export const getLocalStorageItem = (key: keyof typeof LOCAL_STORAGE_KEYS) => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS[key]);
};

export const setLocalStorageItem = (key: keyof typeof LOCAL_STORAGE_KEYS, value: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS[key], value);
};

export const removeLocalStorageItem = (key: keyof typeof LOCAL_STORAGE_KEYS) => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
};
