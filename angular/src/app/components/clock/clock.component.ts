import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/findaccount.service';
import { AuthService } from '../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'clock-component',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClockComponent implements OnInit {
  @Input() username: any;
  @Input() currentUserId: any;
  defaultCurrentUsernameValue = localStorage.getItem('user');
  defaultOptionalUsernameValue = localStorage.getItem('optionalUsername');
  currentTimeToDisplay: Date = new Date();
  timeOfDayGreeting: string = '';
  isNameEditable: boolean = false;
  navigationSubscription: any;

  // Update the component every minute
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) {
    setInterval(() => {
      this.currentTimeToDisplay = new Date();
    }, 10000);

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
      }
    });
  }

  usernameGroup = new FormGroup({
    editUsername: new FormControl(
      this.defaultCurrentUsernameValue || this.defaultOptionalUsernameValue,
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)]
    ),
  });

  // A Date function which accepts an argument to set 'hours' for the Date constructor
  checkTimeOfDay(hours: number) {
    return new Date(
      this.currentTimeToDisplay.getFullYear(),
      this.currentTimeToDisplay.getMonth(),
      this.currentTimeToDisplay.getDate(),
      hours,
      0,
      0
    );
  }
  // Change the greeting based on the time of day
  setTimeGreetingToDisplay() {
    // If the time is between 3AM and 11AM, say 'Good morning'
    if (
      this.currentTimeToDisplay > this.checkTimeOfDay(4) &&
      this.currentTimeToDisplay < this.checkTimeOfDay(11)
    ) {
      return (this.timeOfDayGreeting = 'Good morning,');
      // If the time is between 11AM and 6PM, say 'Good afternoon'
    } else if (
      this.currentTimeToDisplay > this.checkTimeOfDay(11) &&
      this.currentTimeToDisplay < this.checkTimeOfDay(18)
    ) {
      return (this.timeOfDayGreeting = 'Good afternoon,');
    }
    // Between 6PM and 3AM say 'Good evening'
    return (this.timeOfDayGreeting = 'Good evening,');
  }

  // Boolean to switch between the form being editable or not
  editUsername(): void {
    this.isNameEditable = !this.isNameEditable;
  }

  // Change the current users display name/username
  // Then set the new name to localStorage and change the edit-form boolean to false
  submitEditUsernameForm(data: { editUsername: string }): void {
    if (this.authService.isAuthenticated()) {
      this.accountService
        .changeUsername(data.editUsername, this.currentUserId)
        .then(() => {
          this.accountService
            .getCurrentUser(this.currentUserId)
            .then((res: any) => {
              localStorage.setItem('user', res.user.username);
              this.isNameEditable = false;
              this.router.navigate(['']);
            });
        });
    } else {
      localStorage.setItem('optionalUsername', data.editUsername);
      this.isNameEditable = false;
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.setTimeGreetingToDisplay();
  }
}
