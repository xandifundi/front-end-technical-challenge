export function setStorageItem(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorageItem(key: string): unknown {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key);
}
