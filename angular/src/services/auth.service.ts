import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUserInfo: {};
  constructor(private http: HttpClient) {}

  isAuthenticated(): Boolean {
    let userData = localStorage.getItem('user');
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  setUserInfo(user: object) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  validate(username: string, password: string) {
    return this.http
      .post('/api/authenticate', { username: username, password: password })
      .toPromise();
  }
}
