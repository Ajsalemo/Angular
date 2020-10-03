import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  navigationSubscription: any;
  constructor(private http: HttpClient, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
      }
    });
  }

  isAuthenticated(): Boolean {
    const userName = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    if (
      userName &&
      userId !== '' &&
      userName !== null &&
      userId !== null &&
      localStorage.hasOwnProperty('user') &&
      localStorage.hasOwnProperty('userId')
    ) {
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

  logUserIn() {
    // This removes the non-signed in user's Username from local storage - if it exists - so the login stepform can appear again
    // For the user to choose whether or not to signup/login or continue as is
    localStorage.removeItem('optionalUsername');
    this.router.navigate(['']);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('optionalUsername');
    return this.http.get('/api/logout').toPromise();
  }
}
