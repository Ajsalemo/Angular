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
    ]),
  });

  loginGroupThree = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),
  });

  submitLoginFormOne(data: { name: string }): void {
    this.username = data.name;
  }

  submitLoginFormTwo(data: { email: string }): void {
    this.loading = true;
    console.log(this.loading)
    this.userEmail = data.email;
    // On the second step of the form, check if the email account already exists
    // This boolean will dictate the path of the step forms next step
    this.accountService.checkIfEmailExists(this.userEmail).then((res: any) => {
      if (res.user === null || !res.user) {
        this.emailInUse = false;
      } else if (res.user.email === this.userEmail) {
        this.emailInUse = true;
      }
      this.loading = false;
      console.log(this.loading)
    });
  }

  submitLoginForm(data: { password: string }): void {
    this.userPassword = data.password;
    console.log('Login form called / Loading')
    this.authService.signIn(this.userEmail, this.userPassword).then(() => {
      this.authService.setUserInfo({ user: this.username });
      console.log('Login form called / Done loading')
    });
  }

  submitSignUpForm(data: { password: string }): void {
    this.userPassword = data.password;
    console.log('Submit form called / Loading')
    this.authService.signUp(this.userEmail, this.userPassword).then(() => {
      this.authService.setUserInfo({ user: this.username });
      console.log('Submit form called / Done loading')
    });
  }
}
