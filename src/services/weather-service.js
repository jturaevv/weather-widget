import { apiClient } from "~/common/apiClient";

export class WeatherService {
  constructor(request) {
    this.request = request;
  }

  getWeather(params) {
    return this.request.get("/weather", {
      params,
    });
  }

  getCoords(params) {
    return this.request.get('/weather', {
      params
    })
  }
}

export const WeatherServiceImpl = new WeatherService(apiClient);
export default WeatherService;
