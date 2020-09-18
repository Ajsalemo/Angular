import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated(): Boolean {
    const userName = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    if (userName && userId !== '' && userName && userId) {
      return true;
    }
    return false;
  }

  setOptionUserInfo(optionalUsername: string): void {
    localStorage.setItem('optionalUsername', optionalUsername);
  }

  setUserInfo(userName: string, userId: string): void {
    localStorage.setItem('user', userName);
    localStorage.setItem('userId', userId);
  }

  signUp(email: string, password: string, username: string) {
    return this.http
      .post('/api/signup', {
        email: email,
        password: password,
        username: username,
      })
      .toPromise();
  }

  signIn(email: string, password: string) {
    return this.http
      .post('/api/signin', { email: email, password: password })
      .toPromise();
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('optionalUsername');
    return this.http.get('/api/logout').toPromise();
  }
}
