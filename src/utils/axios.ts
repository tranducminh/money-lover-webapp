import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
});

instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    config.headers["Content-Type"] = "application/json";

    const regex = /\/wallets\/[0-9]{2}\/reports\?year=[0-9]{4}/g;
    if (!regex.test(config.url)) {
      config.headers["Accept"] = "application/json";
    } else {
      delete config.headers.common.Accept;
    }
    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
