import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OpenWeatherApiService } from '../../../services/openweatherapi.service';
import { LocationService } from '../../../services/location.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WeatherComponent implements OnInit {
  constructor(
    private openWeatherApiService: OpenWeatherApiService,
    private locationService: LocationService
  ) {}
  // Set the users latitude and longitude
  userLocationLat: string = '';
  userLocationLng: string = '';
  defaultLat: string = '40.71455';
  defaultLng: string = '-74.00712';
  weatherObject: any;
  fiveDayForecast: any[] = [];

  roundCurrentTemperature(temp: string) {
    return Math.round(parseInt(temp));
  }

  // This formats the 5 day forecast provided by OpenWeatherMapAPI
  // Initially, each day consists of breakdowns of 3 hour intervals from the API
  // This function retrieves the 12PM interval from each day, to provide a general 5 day overview for the location requested
  formatFiveDayForecast(data: any) {
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt.includes('15:00')) {
        const formattedForecastDay = moment(data.list[i].dt_txt).format('ddd');
        const formattedFiveDayForecast = data.list[i];
        // Assign each day's weather and corresponding day of the week to object properties, and push this into an object to be looped over in the template
        this.fiveDayForecast.push({
          fiveDayForecast: formattedFiveDayForecast,
          forecastDay: formattedForecastDay,
        });
      }
    }
  }

  // Function to retrieve weather for the current user
  async retrieveUsersCurrentPosition() {
    const location = await this.locationService.getPosition();
    const setLocation = location;
    this.userLocationLat = setLocation.lat;
    this.userLocationLng = setLocation.lng;
    // Retrieve the users location and set the data to the weatherObject property
    this.openWeatherApiService
      .getWeather(this.userLocationLat, this.userLocationLng)
      .subscribe((data: any) => {
        this.weatherObject = data;
        this.formatFiveDayForecast(this.weatherObject);
      });
  }

  ngOnInit(): void {
    this.retrieveUsersCurrentPosition().catch((err) => {
      if (err.code === 1) {
        this.openWeatherApiService
          .getWeather(this.defaultLat, this.defaultLng)
          .subscribe((data: any) => {
            this.weatherObject = data;
          });
      }
    });
  }
}
