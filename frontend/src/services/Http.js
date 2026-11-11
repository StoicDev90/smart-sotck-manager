import axios from "axios";
import { logout as clearUser} from "./AuthService";
import config from '../config.js';

export const baseURL = config.API_URL;//'http://localhost:8080';

function getXsrfToken() {
    const tok = document.cookie.split("; ").find(c => c.startsWith("XSRF-TOKEN="));
    return tok ? decodeURIComponent(tok.split("=")[1]) : null;
}

export const api = axios.create({
    baseURL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const method = (config.method || "get").toLowerCase();
    if (["post","put","patch","delete"].includes(method)) {
        const xsrf = getXsrfToken();
        if (xsrf) config.headers["X-XSRF-TOKEN"] = xsrf;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearUser();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export async function ensureCsrf() {
    try { await api.get("/auth/csrf");} catch{}
}