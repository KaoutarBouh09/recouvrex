import { User } from "src/models/User";

const AUTH_USER_KEY = 'authUser';

let authUser: User | null = null;

export const setAuthUser = (user: User) => {
  authUser = user;
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const getAuthUser = (): User | null => {
  if (authUser) return authUser;

  const stored = localStorage.getItem(AUTH_USER_KEY);
  if (stored) {
    try {
      authUser = JSON.parse(stored);
      return authUser;
    } catch {
      return null;
    }
  }
  return null;
};

export const clearAuthUser = () => {
  authUser = null;
  localStorage.removeItem(AUTH_USER_KEY);
};

export const isAdmin = () => getAuthUser()?.profile?.id == 1;
export const isRegionResponsable = () => getAuthUser()?.profile?.id == 2;
export const isRecoveryAgent = () => getAuthUser()?.profile?.id == 3;