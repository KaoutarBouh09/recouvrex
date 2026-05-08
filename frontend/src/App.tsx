import { useNavigate, useRoutes } from "react-router-dom";
import router from "src/router";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./auth/keycloak";
import { User } from "./models/User";
import {
  createUser,
  getUserByUserName,
  updateUser,
} from "./utils/api/user/userApi";
import { setAuthToken } from "./auth/authToken";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Profile } from "./models/Profile";
import { setAuthUser } from "./auth/authUser";

// Utility function to extract roles from Keycloak token and set user profile
const getRolesAndSetProfile = (tokenParsed: any): Profile | null => {  
  const recouvrexAppRoles = tokenParsed?.resource_access?.["recouvrex-app"]?.roles || [];
  console.log("🚀 ~ getRolesAndSetProfile ~ recouvrexAppRoles:", recouvrexAppRoles)
  // I know this is maynot be the best practice
  if (recouvrexAppRoles.includes("RECOUVREX_ADMIN")) {
    return {id:1,profile:'Administrateur'};
  } else if (recouvrexAppRoles.includes("RECOUVREX_REGION_RESPONSABLE")) {
    return {id:2,profile:'Responsable Region'};
  } else if (recouvrexAppRoles.includes("RECOUVREX_RECOVERY_AGENT")) {
    return {id:3,profile:'Agent de recouvrement'};
  }

  return null;
};

function App() {
  const content = useRoutes(router);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const initOptions = { pkceMethod: "S256" };

  const handleOnEvent = async (event, error) => {
    if (event === "onAuthSuccess") {
      console.log("🚀 ~ handleOnEvent ~ event:", event)
      
      if (keycloak.token) {
        setAuthToken(keycloak.token);
        console.log("your token : " , keycloak.token)
      } else {
        return;
      }

      if (keycloak.authenticated) {
        const authenticatedUser: User = {
          id: 0,
          identificationNumber: "",
          userName: keycloak?.tokenParsed?.preferred_username ?? "",
          firstName: keycloak?.tokenParsed?.given_name ?? "",
          lastName: keycloak?.tokenParsed?.family_name ?? "",
          email: keycloak?.tokenParsed?.email ?? "",
          photo: "",
          nbrCaseAffected: undefined
        };

        // Use the utility function to get roles and set profile
      const userProfile :Profile|null = getRolesAndSetProfile(keycloak.tokenParsed);
    
      if (userProfile) {
        authenticatedUser.profile = userProfile;
      }

        // setCurrentUser(authenticatedUser); ----------------

        console.log(
          "⚠️⚠️authenticatedUser:",
          authenticatedUser
        );

        // Use the authenticated user to get the user from the database by id
       
        try {
          const userData = await getUserByUserName(authenticatedUser.userName);

          // If the user exists in the database, compare user data
          if (userData) {
            console.log("🚀 ~ handleOnEvent ~ userData:", userData)
            
            //set the photo
            // authenticatedUser.photo = userData.photo;
            // authenticatedUser.id=userData.id;
            
            // authenticatedUser.profile=userData.profile;
            //set the user authenticated in the context
            // setCurrentUser(authenticatedUser);
            setAuthUser(userData);
            setCurrentUser(userData);
            

            if (
              userData.firstName != authenticatedUser.firstName ||
              userData.lastName != authenticatedUser.lastName ||
              userData.email != authenticatedUser.email ||
              userData.profile != authenticatedUser?.profile
            ) {
              // If user data doesn't match, update user data in the database

              console.log("the user not match")
              const updatedUser = {
                ...userData,
                userName: authenticatedUser.userName,
                firstName: authenticatedUser.firstName,
                lastName: authenticatedUser.lastName,
                email: authenticatedUser.email,
                profile:authenticatedUser.profile
              };
              // Update user in the database
             const updatedUser1=  await updateUser(userData.id, updatedUser);
             setCurrentUser(updatedUser1)
            } else {
              console.log(
                "User data in Keycloak matches user data in the database."
              );
            }
          } else {
            // If user doesn't exist in the database, create a new user
            console.log(
              "User not found in the database.well try Creating new user:",
              authenticatedUser
            );
           const createdUser:User= await createUser(authenticatedUser);
           console.log("🚀 ~ handleOnEvent ~ createdUser:", createdUser)
           setCurrentUser(createdUser)
          }
           
        } catch (error) {
          console.error("Error while fetching or updating user data:", error);
        }
      }
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initOptions}
      onEvent={(event, error) => handleOnEvent(event, error)}
    >
      <ThemeProvider>
        <CssBaseline />
        {content}
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
}
export default App;
