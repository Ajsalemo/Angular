import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AccountService } from '../../../services/findaccount.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  username: string = '';
  userEmail: string = '';
  userPassword: string = '';
  emailInUse: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

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
      Validators.email,
    ]),
  });

  loginGroupThree = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
  });

  // Getter for the email field
  get emailField() {
    return this.loginGroupTwo.controls;
  }

  submitLoginFormOne(data: { name: string }): void {
    this.username = data.name;
  }

  submitLoginFormTwo(data: { email: string }): void {
    this.loading = true;
    this.userEmail = data.email;
    // On the second step of the form, check if the email account already exists
    // This boolean will dictate the path of the step forms next step
    this.accountService
      .checkIfEmailExists(this.userEmail)
      .then((res: any) => {
        if (res.user === null || !res.user) {
          this.emailInUse = false;
          this.loading = false;
        } else if (res.user.email === this.userEmail) {
          this.emailInUse = true;
          this.loading = false;
        }
      })
      .catch((err: any) => {
        this.loading = false;
        this.errorMessage = err.error.message;
      });
  }

  submitLoginForm(data: { password: string }): void {
    this.userPassword = data.password;
    this.authService
      .signIn(this.userEmail, this.userPassword)
      .then(() => {
        this.authService.setUserInfo({ user: this.username });
        this.loading = false;
      })
      .catch((err: any) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      });
  }

  submitSignUpForm(data: { password: string }): void {
    this.loading = true;
    this.userPassword = data.password;
    this.authService
      .signUp(this.userEmail, this.userPassword, this.username)
      .then(() => {
        this.authService.setUserInfo({ user: this.username });
        this.loading = false;
      })
      .catch((err: any) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      });
  }
}
