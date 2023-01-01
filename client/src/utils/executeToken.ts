export const executeToken = (() => {
  let token = localStorage.getItem('token');

  return (newToken?: string) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      token = localStorage.getItem('token');
    }

    return token;
  };
})();

export const clearToken = () => {
  localStorage.removeItem('token');
};
