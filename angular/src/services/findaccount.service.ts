import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  
  checkIfEmailExists(email: string) {
    return this.http.get(`/api/account/${email}`).toPromise();
  }

  getCurrentUser(id: string) {
    return this.http.get(`/api/findUserById/${id}`).toPromise();
  }

  setAccountDashboardPreferences(accountPreferences: object, id: string) {
    return this.http
      .post('/api/updatePreferences', {
        accountPreferences: accountPreferences,
        id: id,
      })
      .toPromise();
  }
}
