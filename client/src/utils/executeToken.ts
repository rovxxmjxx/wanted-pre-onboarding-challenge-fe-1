export const getToken = () => localStorage.getItem('token');
export const setToken = (newToken: string) => localStorage.setItem('token', newToken);

export const executeToken = (() => {
  const token = getToken();

  return (newToken?: string) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    }

    return token;
  };
})();

export const clearToken = () => {
  localStorage.removeItem('token');
};
