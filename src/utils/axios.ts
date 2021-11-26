import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
});

instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
