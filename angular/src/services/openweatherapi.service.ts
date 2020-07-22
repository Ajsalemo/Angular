import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherApiService {
  constructor(private http: HttpClient) {}
  // Returns the current and 5 day forecast weather timeline
  getWeather(lat: string, lng: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=imperial&appid=${environment.OPEN_WEATHER_API_KEY}`
    );
  }
}
