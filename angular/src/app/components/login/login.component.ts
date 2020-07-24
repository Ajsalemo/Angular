import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  username: string = '';
  userEmail: string = '';

  loginGroupOne = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
  });

  loginGroupTwo = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
  });

  submitLoginFormOne(data: { name: string }) {
    this.username = data.name;
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  submitLoginFormTwo(data: { password: string }) {
    this.userEmail = data.password;
    this.authService
      .validate(this.username, this.userEmail)
      .then((response) => {
        this.authService.setUserInfo({ user: response['user'] });
        this.redirectTo('');
      });
  }
}
