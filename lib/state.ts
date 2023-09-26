let authenticationToken: string | undefined;
export const setAuthenticationToken = (token: string) => {
  authenticationToken = token;
  console.log("setAuthenticationToken: token", token);
};

export const getAuthenticationToken = () => {
  return authenticationToken;
};

export const clearAuthenticationToken = () => {
  authenticationToken = undefined;
};
