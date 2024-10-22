export const login = (username: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  }
};

export const isLoggedIn = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  return false;
};

export const getUsername = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('username');
  }
  return null;
};
