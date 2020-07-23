import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  setUserInfo(user: object) {
    localStorage.setItem('user', user['user']);
  }

  validate(username: string, password: string) {
    return this.http
      .post('/api/authenticate', { username: username, password: password })
      .toPromise();
  }
}
