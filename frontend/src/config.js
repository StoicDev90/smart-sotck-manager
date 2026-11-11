const config = {
  API_URL:
    window.__env?.API_URL ||
    process.env.REACT_APP_API_URL ||
    null,
};

if (!config.API_URL) {
  throw new Error("API_URL no está configurada");
}
  
export default config;

  