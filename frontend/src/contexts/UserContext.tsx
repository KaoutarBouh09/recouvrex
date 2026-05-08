import { createContext, FC, ReactNode, useState } from "react";
import { User } from "src/models/User";

// Define the context type
type UserContextType = {
  currentUser: User; // Change 'user' to 'currentUser' or 'connectedUser'
  setCurrentUser: (data: User) => void; // Change 'setUser' to 'setCurrentUser'

  isAdmin: () => boolean;
  isRegionResponsable: () => boolean;
  isRecoveryAgent: () => boolean;
};

// Create the user context
export const UserContext = createContext<UserContextType>({
  currentUser: {
    id: 0,
    identificationNumber: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    nbrCaseAffected: undefined,
  },
  setCurrentUser: () => {}, // Change 'setUser' to 'setCurrentUser'

  isAdmin: () => false,
  isRegionResponsable: () => false,
  isRecoveryAgent: () => false,
});

// Define the props for the provider component
interface UserProviderProps {
  children: ReactNode;
}

// Implement the provider component
export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  // State to hold user data
  const [currentUser, setCurrentUser] = useState<User>({
    id: 0,
    identificationNumber: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    nbrCaseAffected: undefined,
  });

  // Function to check if the user is an admin
  const isAdmin = () => currentUser?.profile?.id == 1;

  // Function to check if the user is a region responsable
  const isRegionResponsable = () => currentUser?.profile?.id == 2;

  // Function to check if the user is a recovery agent
  const isRecoveryAgent = () => currentUser?.profile?.id == 3;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAdmin,
        isRegionResponsable,
        isRecoveryAgent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
