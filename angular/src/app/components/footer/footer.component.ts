import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AccountService } from '../../../services/findaccount.service';
import { BackgroundImageService } from '../../../services/background-images.service';

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
  @Input() optionalUsername: string;
  @Input() parentIsLinks: boolean;
  @Input() parentIsSearch: boolean;
  @Input() parentIsWeather: boolean;
  @Input() parentIsTodo: boolean;
  @Input() todos: any[] = [];
  panelOpenState: boolean = false;
  generalOpenState: boolean = true;
  photoOpenState: boolean = false;
  isLoading: boolean = false;
  navigationSubscription: any;
  backgroundImagesAvailable: any;
  backgroundImagePath: string = '../../../assets/images/';

  constructor(
    private authServiceFooter: AuthService,
    private accountServiceFooter: AccountService,
    private router: Router,
    private backgroundImageService: BackgroundImageService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
      }
    });
  }

  slideToggleGroup = new FormGroup({
    links: new FormControl(''),
    search: new FormControl(''),
    weather: new FormControl(''),
    todo: new FormControl(''),
  });

  displayAllBackgroundImages(): void {
    this.backgroundImagesAvailable = this.backgroundImageService.getBackgroundImages();
  }

  // Function to pull and set the personal background image URL
  // The home-background component will pull this value for localStorage to set for the background for the user
  setTodaysBackgroundImage(e: any): void {
    const customBackgroundImageURL = e.target.attributes[4].value;
    localStorage.setItem('customBackgroundImageURL', customBackgroundImageURL);
    // Reinitialize the component
    this.router.navigate(['']);
  }

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
    // If the user is NOT logged in either by account or optional/temporary, persist their changes by localStorage
    if (this.currentUserId === '' || !this.currentUserId) {
      localStorage.setItem('parentIsLinks', data.links.toString());
      localStorage.setItem('parentIsSearch', data.search.toString());
      localStorage.setItem('parentIsWeather', data.weather.toString());
      localStorage.setItem('parentIsTodo', data.todo.toString());
      this.router.navigate(['']);
    } else {
      // Else make an API call to Postgres to retreieve the logged in users account preferences
      this.accountServiceFooter
        .setAccountDashboardPreferences(data, this.currentUserId)
        .then(() => {
          this.router.navigate(['']);
        })
        .catch((err: any) => console.log(err));
    }
  }

  // Retreive account preferences to keep synced with what is updated
  getAccountPreferences(): void {
    if (this.authServiceFooter.isAuthenticated() === true) {
      this.isLoading = true;
      this.accountServiceFooter
        .getCurrentUser(this.currentUserId)
        .then(() => {
          this.isLoading = false;
        })
        .catch((err: any) => {
          this.isLoading = false;
        });
    }
  }

  conditionalFooterLoginIn(): void {
    // This removes the non-signed in user's Username from local storage - if it exists - so the login stepform can appear again
    // For the user to choose whether or not to signup/login or continue as is
    this.authServiceFooter.logUserIn();
  }

  logUserOut(): void {
    this.authServiceFooter.logout();
    this.router.navigate(['']);
    // After logout, reset these values back to their initial states
    localStorage.removeItem('parentIsLinks');
    localStorage.removeItem('parentIsSearch');
    localStorage.removeItem('parentIsWeather');
    localStorage.removeItem('parentIsTodo');
    this.parentIsLinks = true;
    this.parentIsSearch = true;
    this.parentIsWeather = true;
    this.parentIsTodo = true;
    this.todos = [];
  }

  ngOnInit(): void {
    this.displayAllBackgroundImages();
  }
}
