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
  isLoading: boolean = false;
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

  // Toggles the visibility of the 'General' section within the personalization popup menu
  toggleGeneralState(e: any): void {
    if (this.generalOpenState === true) {
      e.stopPropagation();
      return;
    }
    this.generalOpenState = !this.generalOpenState;
    this.photoOpenState = false;
    e.stopPropagation();
  }

  // Toggles the visibility of the 'Photo' section within the personalization popup menu
  togglePhotoState(e: any): void {
    if (this.photoOpenState === true) {
      e.stopPropagation();
      return;
    }
    this.photoOpenState = !this.photoOpenState;
    this.generalOpenState = false;
    e.stopPropagation();
  }

  // Form that submits account preferences in terms of what is visible within the UI
  submitAccountPreferences(data: {
    links: boolean;
    search: boolean;
    weather: boolean;
    todo: boolean;
  }) {
    this.accountServiceFooter
      .setAccountDashboardPreferences(data, this.currentUserId)
      .then((res: any) => {
        this.isLinks = res.user.updatedLinks;
        this.isSearch = res.user.updatedSearch;
        this.isWeather = res.user.updatedWeather;
        this.isTodo = res.user.updatedTodo;
      })
      .catch((err: any) => console.log(err));
  }

  // Retreive account preferences to keep synced with what is updated
  getAccountPreferences(): void {
    if (this.authServiceFooter.isAuthenticated() === true) {
      this.isLoading = true;
      this.accountServiceFooter
        .getCurrentUser(this.currentUserId)
        .then((res: any) => {
          this.isLinks = res.user.showLinks;
          this.isSearch = res.user.showSearch;
          this.isWeather = res.user.showWeather;
          this.isTodo = res.user.showTodo;
          this.isLoading = false;
        })
        .catch((err: any) => {
          console.log(err);
          this.isLoading = false;
        });
    }
  }

  logUserIn(): void {
    this.router.navigate(['']);
  }

  logUserOut(): void {
    this.authServiceFooter.logout();
    this.router.navigate(['']);
    this.isLinks = true;
    this.isSearch = true;
    this.isWeather = true;
    this.isTodo = true;
  }
}
