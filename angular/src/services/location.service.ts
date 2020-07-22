import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (res) => {
            let lat: number = res.coords.latitude;
            let lng: number = res.coords.longitude;
            resolve({ lat, lng });
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
}
