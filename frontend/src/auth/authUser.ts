import { User } from "src/models/User";

let authUser: User | null = null;

export const setAuthUser = (user: User) => {
  console.log("\nseting new auth user ", user);
  authUser = user;
};

export const getAuthUser = (): User | null => {
  console.log("🚀 ~ getAuthUser ~ authUser:", authUser)
  return authUser;
};

// Function to check if the user is an admin
export const isAdmin = () => authUser?.profile?.id == 1;

// Function to check if the user is a region responsable
export const isRegionResponsable = () => authUser?.profile?.id == 2;

// Function to check if the user is a recovery agent
export const isRecoveryAgent = () => authUser?.profile?.id == 3;

