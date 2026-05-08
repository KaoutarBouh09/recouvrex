// let authToken: string | null = null;

// export const setAuthToken = (token: string) => {
//     console.log("\nnew token ",token)
//   authToken = token;
// };

// export const getAuthToken = (): string | null => {
//   return authToken;
// };
export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

