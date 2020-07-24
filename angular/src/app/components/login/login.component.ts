import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  nameField: string = '';
  emailField: string = '';
  constructor(private authService: AuthService, private router: Router) {}

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

  // These two functions are for the step-form
  submitLoginFormOne(data: { name: string }) {
    this.nameField = data.name;
  }

  // This function takes the 'nameField' value and sets it with the value of 'emailField' 
  // These values are supplied to the arguemnts of 'validate' to be proxied to Passport.js
  submitLoginFormTwo(data: { password: string }) {
    this.emailField = data.password;
    this.authService
      .validate(this.nameField, this.emailField)
      .then((response) => {
        console.log(response);
        this.authService.setUserInfo({ user: response['user'] });
        this.router.navigate(['main']);
      });
  }
}
