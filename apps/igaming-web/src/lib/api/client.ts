import axios, { type AxiosResponse, type AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.data && typeof config.data === "object") {
      // TODO: Should done safer
      config.data = JSON.parse(JSON.stringify(config.data));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
