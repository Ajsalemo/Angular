import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AccountService } from '../../../services/findaccount.service';

@Component({
  selector: 'component-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
  @Input() authorToDisplay: string;
  @Input() photoURL: string;
  @Input() currentUser: string;
  @Input() currentUserId: string;
  panelOpenState: boolean = false;
  generalOpenState: boolean = true;
  photoOpenState: boolean = false;
  isLinks: boolean = true;
  isSearch: boolean = true;
  isWeather: boolean = true;
  isTodo: boolean = true;

  constructor(
    private authServiceFooter: AuthService,
    private accountServiceFooter: AccountService,
    private router: Router
  ) {}

  slideToggleGroup = new FormGroup({
    links: new FormControl(''),
    search: new FormControl(''),
    weather: new FormControl(''),
    todo: new FormControl(''),
  });

  toggleGeneralState(e: any): void {
    if (this.generalOpenState === true) {
      e.stopPropagation();
      return;
    }
    this.generalOpenState = !this.generalOpenState;
    this.photoOpenState = false;
    e.stopPropagation();
  }

  togglePhotoState(e: any): void {
    if (this.photoOpenState === true) {
      e.stopPropagation();
      return;
    }
    this.photoOpenState = !this.photoOpenState;
    this.generalOpenState = false;
    e.stopPropagation();
  }

  submitAccountPreferences(data: {
    links: boolean;
    search: boolean;
    weather: boolean;
    todo: boolean;
  }) {
    console.log(data);
    this.accountServiceFooter
      .setAccountDashboardPreferences(data, this.currentUserId)
      .then((res: any) => console.log(res));
  }

  logUserIn(): void {
    this.router.navigate(['']);
  }

  logUserOut(): void {
    this.authServiceFooter.logout();
    this.router.navigate(['']);
  }
}
