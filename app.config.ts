console.log("API Config:", import.meta.env.VITE_API_HOSTNAME);

const APP_CONFIG = {
  API_CONFIG: {
    hostname: import.meta.env.VITE_API_HOSTNAME,
    port: import.meta.env.VITE_API_PORT,
  },
};

export default APP_CONFIG;
