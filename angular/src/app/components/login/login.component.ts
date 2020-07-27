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
    this.userEmail = data.email;
    this.accountService.checkIfEmailExists(this.userEmail).then((res: any) => {
      console.log(res.email.email)
      if (res.email.email === this.userEmail) {
        this.emailInUse = true;
      }
      console.log(this.emailInUse)
    })
  }

  submitLoginFormThree(data: { password: string }): void {
    this.userPassword = data.password;
    this.authService.validate(this.userEmail, this.userPassword).then(() => {
      this.authService.setUserInfo({ user: this.username });
    });
  }
}
