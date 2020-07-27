import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  checkIfEmailExists(email: string) {
    console.log(email)
    return this.http
      .get(`/api/account/${email}`)
      .toPromise();
  }
}