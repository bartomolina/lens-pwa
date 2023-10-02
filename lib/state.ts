export const setAuthenticationToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getAuthenticationToken = () => {
  return localStorage.getItem("accessToken");
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const clearAuthenticationToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
