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
    API_BASE_URL: 'http://localhost:9080',  // ✅ corrigé (était 3000)
    OMDB_BASE_URL: 'https://www.omdbapi.com',
    AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
  }
}

const dev = {
  url: {
    KEYCLOAK_BASE_URL: "http://localhost:8080",
    API_BASE_URL: 'http://localhost:8081',
    OMDB_BASE_URL: 'https://www.omdbapi.com',
    AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
  }
}

const kubernetes = {
  url: {
    KEYCLOAK_BASE_URL: "http://localhost:8080",
    API_BASE_URL: '/api',
    OMDB_BASE_URL: 'https://www.omdbapi.com',
    AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
  }
}

const baseConfig =
  import.meta.env.VITE_NODE_ENV === 'development' ? dev :
  import.meta.env.VITE_NODE_ENV === 'docker' ? docker :
  import.meta.env.VITE_NODE_ENV === 'kubernetes' ? kubernetes : prod

// ✅ Les variables VITE injectées au build-time écrasent tout
export const config = {
  url: {
    ...baseConfig.url,
    ...(import.meta.env.VITE_API_BASE_URL && { API_BASE_URL: import.meta.env.VITE_API_BASE_URL }),
    ...(import.meta.env.VITE_KEYCLOAK_BASE_URL && { KEYCLOAK_BASE_URL: import.meta.env.VITE_KEYCLOAK_BASE_URL }),
  }
}