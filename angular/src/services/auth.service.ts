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

  signUp(email: string, password: string, username: string) {
    return this.http
      .post('/api/signup', { email: email, password: password, username: username })
      .toPromise();
  }

  signIn(email: string, password: string) {
    return this.http
      .post('/api/signin', { email: email, password: password })
      .toPromise();
  }
}
