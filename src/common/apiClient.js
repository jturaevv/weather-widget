import axios from "axios";
import { WEATRHER_API_BASE_URL } from "~/common/constants";
import { WEATHER_API_KEY } from "~/common/constants";

const instance = axios.create({
  baseURL: WEATRHER_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.params["appid"] = WEATHER_API_KEY;

  return config;
});

export const apiClient = instance;
