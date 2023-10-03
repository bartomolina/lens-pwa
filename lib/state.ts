import { NETWORK } from "./constants";

const ACCESS_TOKEN = NETWORK === "mainnet" ? "accessTokenV1" : "accessToken";
const REFRESH_TOKEN = NETWORK === "mainnet" ? "refreshTokenV1" : "refreshToken";
const PROFILE_ID = "profileId";

export const setAuthenticationToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

export const getAuthenticationToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN, token);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const setProfileId = (token: string) => {
  localStorage.setItem(PROFILE_ID, token);
};

export const getProfileId = () => {
  return localStorage.getItem(PROFILE_ID);
};

export const clearProfileId = () => {
  localStorage.removeItem(PROFILE_ID);
};

export const clearAuthenticationToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  clearProfileId();
};
