export const setAuthenticationToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getAuthenticationToken = () => {
  return localStorage.getItem("accessToken");
};

export const clearAuthenticationToken = () => {
  localStorage.clear();
};
