import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
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
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  hidePassword: boolean = true;
  navigationSubscription: any;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
      }
    });
  }

  loginGroupOne = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
    ]),
  });

  loginGroupTwo = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
      Validators.pattern(/\S+@\S+\.\S+/),
    ]),
  });

  loginGroupThree = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255),
      Validators.pattern(
        '^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*d)(?=.*[!#$%&? "]).*$'
      ),
    ]),
  });

  // Getter for the name field
  get nameField() {
    return this.loginGroupOne.controls;
  }

  // Getter for the email field
  get emailField() {
    return this.loginGroupTwo.controls;
  }

  // Getter for the password field
  get passwordField() {
    return this.loginGroupThree.controls;
  }

  continueWithoutLoggingIn(data: { name: string }): void {
    this.authService.setOptionUserInfo(data.name);
    this.router.navigate(['']);
  }

  submitLoginFormOne(data: { name: string }): void {
    this.username = data.name;
  }

  submitLoginFormTwo(data: { email: string }): void {
    this.emailErrorMessage = '';
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
        this.emailErrorMessage = err.error.message;
      });
  }

  submitLoginForm(data: { password: string }): void {
    this.passwordErrorMessage = '';
    this.userPassword = data.password;
    this.passwordErrorMessage = '';
    this.loading = true;
    this.authService
      .signIn(this.userEmail, this.userPassword)
      .then((res: any) => {
        this.authService.setUserInfo(res.user.username, res.user.id);
        // Remove localStorage settings when logging in
        // These are to persist UI/account preferences for non-authenticated users
        // After logging in and removing the below items, a call to express/postgres is made to pull user preferences from the database
        localStorage.removeItem('parentIsLinks');
        localStorage.removeItem('parentIsSearch');
        localStorage.removeItem('parentIsWeather');
        localStorage.removeItem('parentIsTodo');
        this.loading = false;
        this.router.navigate(['']);
      })
      .catch((err: any) => {
        this.passwordErrorMessage = err.error.message;
        this.loading = false;
      });
  }

  submitSignUpForm(data: { password: string }): void {
    this.loading = true;
    this.userPassword = data.password;
    this.passwordErrorMessage = '';
    this.authService
      .signUp(this.userEmail, this.userPassword, this.username)
      .then((res: any) => {
        this.authService.setUserInfo(res.user.username, res.user.id);
        // Remove localStorage settings when logging in
        // These are to persist UI/account preferences for non-authenticated users
        // After logging in and removing the below items, a call to express/postgres is made to pull user preferences from the database
        localStorage.removeItem('parentIsLinks');
        localStorage.removeItem('parentIsSearch');
        localStorage.removeItem('parentIsWeather');
        localStorage.removeItem('parentIsTodo');
        this.loading = false;
        this.router.navigate(['']);
      })
      .catch((err: any) => {
        this.passwordErrorMessage = err.error.message;
        this.loading = false;
      });
  }
}
