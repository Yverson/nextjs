export const isBrowser = typeof window !== "undefined";

export const storedToken = isBrowser && localStorage.getItem('token');

export const storedUser = isBrowser && localStorage.getItem('user');