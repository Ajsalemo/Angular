import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BackgroundImageService } from '../../../services/background-images.service';
import { Router, NavigationEnd } from '@angular/router';
import { AccountService } from '../../../services/findaccount.service';
import { AuthService } from '../../../services/auth.service';

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

  defaultImage: string = '../../../assets/images/monday.jpg';
  currentDay: string = moment().format('dddd').toLocaleLowerCase();
  imageLocation: string = '../../../assets/images/';
  authorToDisplay: string = '';
  photoURL: string = '';
  backgroundImageToDisplay: string = '';
  currentUser = localStorage.getItem('user');
  currentUserId = localStorage.getItem('userId');
  navigationSubscription: any;
  parentIsLinks: boolean;
  parentIsSearch: boolean;
  parentIsWeather: boolean;
  parentIsTodo: boolean;

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
      }
    });
  }

  reIntializeComponent(): void {
    this.currentUser = localStorage.getItem('user');
    this.currentUserId = localStorage.getItem('userId');
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
          console.log(this.parentIsLinks)
        })
        .catch((err: any) => {
          if (err.status === 404) {
            this.authServiceAuth.logout();
            this.router.navigate(['']);
          }
        });
    }
  }

  // This method rotates the daily image based on day of the week
  // This method will includes 7 images, one used as a fall back
  rotatingDailyImage(): void {
    // Call the service and set it to a variable
    this.backgroundImageMetaData = this.backgroundImageService.getBackgroundImages();

    // The current day of the week is grabbed and converted to lowercase through the 'currentDay' variable
    // The 'currentDay' variable is compared to the image names in the 'defaultImageArray'
    // If these two strings match, the loop returns with the matching image name and sets it for that day
    for (let i = 0; i < this.backgroundImageMetaData.length; i++) {
      if (
        `${this.currentDay}.jpg` ===
        this.backgroundImageMetaData[i].backgroundURL
      ) {
        this.authorToDisplay = this.backgroundImageMetaData[i].author;
        this.photoURL = this.backgroundImageMetaData[i].photoURL;
        this.backgroundImageToDisplay = `${this.imageLocation}/${this.backgroundImageMetaData[i].backgroundURL}`;
      }
    }
  }

  // On intialization execute the 'rotatingDailyImage' to set the image metaData
  ngOnInit(): void {
    this.rotatingDailyImage();
    this.retrieveUserAccountInformation();
  }
}
