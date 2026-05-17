const prod = {
    url: {
      KEYCLOAK_BASE_URL: "https://keycloak.herokuapp.com",
      API_BASE_URL: 'https://myapp.herokuapp.com',
      OMDB_BASE_URL: 'https://www.omdbapi.com',
      AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
    }
  }

const docker = {
    url: {
      KEYCLOAK_BASE_URL: "http://localhost:8080",
      API_BASE_URL: 'http://localhost:3000',  // ← passe par NGINX proxy
      OMDB_BASE_URL: 'https://www.omdbapi.com',
      AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
  }
}
  
  const dev = {
    url: {
       KEYCLOAK_BASE_URL: "http://localhost:8080",
      //KEYCLOAK_BASE_URL: "https://keycloak-production-075d.up.railway.app",
      API_BASE_URL: 'http://localhost:8081',
      OMDB_BASE_URL: 'https://www.omdbapi.com',
      AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
    }
  }
  const kubernetes = {
    url: {
      KEYCLOAK_BASE_URL: "http://localhost:8080",
      API_BASE_URL: 'http://localhost:9080',
      OMDB_BASE_URL: 'https://www.omdbapi.com',
      AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
    }
}
  
  export const config = 
    import.meta.env.VITE_NODE_ENV === 'development' ? dev :
    import.meta.env.VITE_NODE_ENV === 'docker' ? docker : prod
    import.meta.env.VITE_NODE_ENV === 'kubernetes' ? kubernetes : prod