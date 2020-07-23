import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUserInfo: {};
  constructor(private http: HttpClient) { }

  isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  setUserInfo(user: object){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  validate(email: string, password: string) {
    return this.http.post('/api/authenticate', {'username' : email, 'password' : password}).toPromise()
  }
}