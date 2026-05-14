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

const getRolesAndSetProfile = (tokenParsed: any): Profile | null => {
  const recouvrexAppRoles = tokenParsed?.resource_access?.["recouvrex-app"]?.roles || [];
  console.log("🚀 ~ getRolesAndSetProfile ~ recouvrexAppRoles:", recouvrexAppRoles);
  if (recouvrexAppRoles.includes("RECOUVREX_ADMIN")) {
    return { id: 1, profile: "Administrateur" };
  } else if (recouvrexAppRoles.includes("RECOUVREX_REGION_RESPONSABLE")) {
    return { id: 2, profile: "Responsable Region" };
  } else if (recouvrexAppRoles.includes("RECOUVREX_RECOVERY_AGENT")) {
    return { id: 3, profile: "Agent de recouvrement" };
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
      console.log("🚀 ~ handleOnEvent ~ event:", event);

      if (keycloak.token) {
        setAuthToken(keycloak.token);
        console.log("your token : ", keycloak.token);
      } else {
        return;
      }

      // ← Attendre que le token soit propagé dans l'intercepteur Axios
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (keycloak.authenticated) {
        const authenticatedUser: User = {
          id: 0,
          identificationNumber: "",
          userName: keycloak?.tokenParsed?.preferred_username ?? "",
          firstName: keycloak?.tokenParsed?.given_name ?? "",
          lastName: keycloak?.tokenParsed?.family_name ?? "",
          email: keycloak?.tokenParsed?.email ?? "",
          photo: "",
          nbrCaseAffected: undefined,
        };

        const userProfile: Profile | null = getRolesAndSetProfile(keycloak.tokenParsed);
        if (userProfile) {
          authenticatedUser.profile = userProfile;
        }

        console.log("⚠️⚠️authenticatedUser:", authenticatedUser);

        try {
          let userData;

          // ← Retry si le token n'est pas encore accepté par le backend
          try {
            userData = await getUserByUserName(authenticatedUser.userName);
          } catch (firstError) {
            console.warn("Premier essai échoué, retry dans 500ms...");
            await new Promise((resolve) => setTimeout(resolve, 500));
            userData = await getUserByUserName(authenticatedUser.userName);
          }

          if (userData) {
            console.log("🚀 ~ handleOnEvent ~ userData:", userData);
            setAuthUser(userData);
            setCurrentUser(userData);

            if (
              userData.firstName != authenticatedUser.firstName ||
              userData.lastName != authenticatedUser.lastName ||
              userData.email != authenticatedUser.email ||
              userData.profile != authenticatedUser?.profile
            ) {
              console.log("the user not match");
              const updatedUser = {
                ...userData,
                userName: authenticatedUser.userName,
                firstName: authenticatedUser.firstName,
                lastName: authenticatedUser.lastName,
                email: authenticatedUser.email,
                profile: authenticatedUser.profile,
              };
              const updatedUser1 = await updateUser(userData.id, updatedUser);
              setCurrentUser(updatedUser1);
            } else {
              console.log("User data in Keycloak matches user data in the database.");
            }
          } else {
            console.log("User not found in the database. Creating new user:", authenticatedUser);
            const createdUser: User = await createUser(authenticatedUser);
            console.log("🚀 ~ handleOnEvent ~ createdUser:", createdUser);
            setAuthUser(createdUser);  // ← manquait dans l'original
            setCurrentUser(createdUser);
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