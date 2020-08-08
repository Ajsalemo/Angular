import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): Boolean {
    const userName = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    if (userName && userId !== '' && userName && userId) {
      return true;
    }
    // If the userName or userId is empty(such as being deleted), then log the user out
    this.logout();
    this.router.navigate(['']);
    return false;
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
    return this.http.get('/api/logout').toPromise();
  }
}
