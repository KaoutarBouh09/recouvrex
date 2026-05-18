const dev = {
  url: {
    KEYCLOAK_BASE_URL: "http://localhost:8080",
    API_BASE_URL: 'http://localhost:8081',
    OMDB_BASE_URL: 'https://www.omdbapi.com',
    AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
  }
}

const prod = {
  url: {
    KEYCLOAK_BASE_URL: "http://localhost:8080",
    API_BASE_URL: '/api',
    OMDB_BASE_URL: 'https://www.omdbapi.com',
    AVATARS_DICEBEAR_URL: 'https://api.dicebear.com/6.x'
  }
}

export const config = import.meta.env.VITE_NODE_ENV === 'development' ? dev : prod