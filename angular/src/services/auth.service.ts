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

  validate(email: string, password: string) {
    console.log(email)
    console.log(password)
    return this.http
      .post('/api/authenticate', { email: email, password: password })
      .toPromise();
  }
}
