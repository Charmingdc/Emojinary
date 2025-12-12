const useLocalStorage = (key: string, prefix = "$emojinary_") => {
  const storageKey = `${prefix}${key}`;

  function getItem<T>(): T | null {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  function setItem<T>(value: T) {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }

  function removeItem() {
    localStorage.removeItem(storageKey);
  }

  return { getItem, setItem, removeItem };
};

export default useLocalStorage;
