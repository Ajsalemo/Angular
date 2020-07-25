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
  userPassword: string = '';

  loginGroupOne = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
  });

  loginGroupTwo = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
  });

  loginGroupThree = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
  });

  submitLoginFormOne(data: { name: string }) {
    this.username = data.name;
  }

  submitLoginFormTwo(data: { email: string }) {
    this.userEmail = data.email;
  }

  submitLoginFormThree(data: { password: string }) {
    this.userPassword = data.password;
    this.authService
      .validate(this.userEmail, this.userPassword)
      .then((response) => {
        this.authService.setUserInfo({ user: response['user'] });
      });
  }
}
