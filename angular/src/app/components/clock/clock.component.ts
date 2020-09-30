import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clock-component',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  @Input() username: string;
  currentTimeToDisplay: Date = new Date();
  timeOfDayGreeting: string = '';
  isNameEditable: boolean = false;
  // Update the component every minute
  constructor() {
    setInterval(() => {
      this.currentTimeToDisplay = new Date();
    }, 10000);
  }
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
      return (this.timeOfDayGreeting = 'Good morning');
      // If the time is between 11AM and 6PM, say 'Good afternoon'
    } else if (
      this.currentTimeToDisplay > this.checkTimeOfDay(11) &&
      this.currentTimeToDisplay < this.checkTimeOfDay(18)
    ) {
      return (this.timeOfDayGreeting = 'Good afternoon');
    }
    // Between 6PM and 3AM say 'Good evening'
    return (this.timeOfDayGreeting = 'Good evening');
  }

  editUsername(): void {
    this.isNameEditable = !this.isNameEditable;
    console.log(this.isNameEditable)
  }

  ngOnInit(): void {
    this.setTimeGreetingToDisplay();
  }
}
