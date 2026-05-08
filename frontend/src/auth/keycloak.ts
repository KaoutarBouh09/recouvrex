import Keycloak from 'keycloak-js';
import { config } from 'src/config/Constants';

const keycloak = new Keycloak({
    url: `${config.url.KEYCLOAK_BASE_URL}`,
    realm: "Recouvrex",
    clientId: "frontend",
  });

export default keycloak;
