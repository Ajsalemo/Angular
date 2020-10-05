import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as devEnvironment } from '../environments/environment';
import { environment as prodEnviroment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherApiService {
  constructor(private http: HttpClient) {}
  OPEN_WEATHERAPI_KEY_ENV =
    prodEnviroment.production === true
      ? prodEnviroment.OPEN_WEATHER_API_KEY
      : devEnvironment.OPEN_WEATHER_API_KEY;

  // Returns the current and 5 day forecast weather timeline
  getWeather(lat: string, lng: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=imperial&appid=${this.OPEN_WEATHERAPI_KEY_ENV}`
    );
  }
}
