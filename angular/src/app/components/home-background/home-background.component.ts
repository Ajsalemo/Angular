import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from '../../../services/auth.service';
import { BackgroundImageService } from '../../../services/background-images.service';
import { AccountService } from '../../../services/findaccount.service';

@Component({
  selector: 'component-home-background',
  templateUrl: './home-background.component.html',
  styleUrls: ['./home-background.component.scss'],
  providers: [BackgroundImageService],
})
export class HomeBackgroundComponent implements OnInit {
  backgroundImageMetaData: {
    id: string;
    photoURL: string;
    author: string;
    backgroundURL: string;
  }[];

  defaultImage: string = '../../../assets/images/blur.jpg';
  currentDay: string = moment().format('dddd').toLocaleLowerCase();
  imageLocation: string = '../../../assets/images/';
  authorToDisplay: string = '';
  photoURL: string = '';
  backgroundImageToDisplay: string = '';
  currentUser = localStorage.getItem('user');
  currentUserId = localStorage.getItem('userId');
  optionalUsername = localStorage.getItem('optionalUsername');
  customBackgroundImageToDisplay = localStorage.getItem(
    'customBackgroundImageURL'
  );
  navigationSubscription: any;
  parentIsLinks: boolean = true;
  parentIsSearch: boolean = true;
  parentIsWeather: boolean = true;
  parentIsTodo: boolean = true;
  todos: any[] = [];

  constructor(
    private backgroundImageService: BackgroundImageService,
    private router: Router,
    private getCurrentUserService: AccountService,
    private authServiceAuth: AuthService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.reIntializeComponent();
        this.retrieveUserAccountInformation();
        this.rotatingDailyImage();
      }
    });
  }

  reIntializeComponent(): void {
    this.currentUser = localStorage.getItem('user');
    this.currentUserId = localStorage.getItem('userId');
    this.optionalUsername = localStorage.getItem('optionalUsername');
    // If the respective localStorage item doesn't exist, then set the booleans for the slider preferences back to true(which is the default)
    // This is to reset them upon logout of a user
    // Doing this only when a user is logged in also prevents the sliders from 'flapping' when changing preferences when logged in
    if (!this.currentUserId || this.currentUserId === '') {
      this.parentIsLinks = !localStorage.getItem('parentIsLinks')
        ? true
        : localStorage.getItem('parentIsLinks') === 'true';
      this.parentIsSearch = !localStorage.getItem('parentIsSearch')
        ? true
        : localStorage.getItem('parentIsSearch') === 'true';
      this.parentIsWeather = !localStorage.getItem('parentIsWeather')
        ? true
        : localStorage.getItem('parentIsWeather') === 'true';
      this.parentIsTodo = !localStorage.getItem('parentIsTodo')
        ? true
        : localStorage.getItem('parentIsTodo') === 'true';
      this.todos = [];
    }
  }

  retrieveUserAccountInformation() {
    if (this.authServiceAuth.isAuthenticated() === true) {
      this.getCurrentUserService
        .getCurrentUser(this.currentUserId)
        .then((res: any) => {
          this.parentIsLinks = res.user.showLinks;
          this.parentIsSearch = res.user.showSearch;
          this.parentIsWeather = res.user.showWeather;
          this.parentIsTodo = res.user.showTodo;
        })
        .catch((err: any) => {
          if (err.status === 404) {
            this.authServiceAuth.logout();
            this.router.navigate(['']);
          }
        });
    } else {
      // If the respective localStorage item doesn't exist, then set the booleans for the slider preferences back to true(which is the default)
      // This is to reset them upon logout of a user
      // Doing this only when a user is logged in also prevents the sliders from 'flapping' when changing preferences when logged in

      this.parentIsLinks = !localStorage.getItem('parentIsLinks')
        ? true
        : localStorage.getItem('parentIsLinks') === 'true';
      this.parentIsSearch = !localStorage.getItem('parentIsSearch')
        ? true
        : localStorage.getItem('parentIsSearch') === 'true';
      this.parentIsWeather = !localStorage.getItem('parentIsWeather')
        ? true
        : localStorage.getItem('parentIsWeather') === 'true';
      this.parentIsTodo = !localStorage.getItem('parentIsTodo')
        ? true
        : localStorage.getItem('parentIsTodo') === 'true';
    }
  }

  // This method rotates the daily image based on day of the week
  // This method will includes 7 images, one used as a fall back
  rotatingDailyImage(): void {
    // Call the service and set it to a variable
    this.backgroundImageMetaData = this.backgroundImageService.getBackgroundImages();
    const customBackgroundImageToDisplay = localStorage.getItem(
      'customBackgroundImageURL'
    );
    // If the user chooses a custom background image in the footer menu
    // Then display that image
    if (customBackgroundImageToDisplay) {
      this.backgroundImageToDisplay = customBackgroundImageToDisplay;
      // Loop through the backgroundImage meta data to compare if the current background photo matches the photo metadata
      for (let i = 0; i < this.backgroundImageMetaData.length; i++) {
        // If there is a match, set the author to the correct photo
        // This while only execute if the user is manually selecting a background image
        if (customBackgroundImageToDisplay.includes(this.backgroundImageMetaData[i].backgroundURL)) {
          this.authorToDisplay = this.backgroundImageMetaData[i].author;
        }
      }
    } else {
      // Else, if the custom users the 24hour rotation image - then do the following
      // The current day of the week is grabbed and converted to lowercase through the 'currentDay' variable
      // The 'currentDay' variable is compared to the image names in the 'defaultImageArray'
      // If these two strings match, the loop returns with the matching image name and sets it for that day
      for (let j = 0; j < this.backgroundImageMetaData.length; j++) {
        if (
          `${this.currentDay}.jpg` ===
          this.backgroundImageMetaData[j].backgroundURL
        ) {
          this.authorToDisplay = this.backgroundImageMetaData[j].author;
          this.photoURL = this.backgroundImageMetaData[j].photoURL;
          this.backgroundImageToDisplay = `${this.imageLocation}/${this.backgroundImageMetaData[j].backgroundURL}`;
        }
      }
    }
  }

  // On intialization execute the 'rotatingDailyImage' to set the image metaData
  ngOnInit(): void {
    this.rotatingDailyImage();
    this.retrieveUserAccountInformation();
  }
}
