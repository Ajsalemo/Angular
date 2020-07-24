import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BackgroundImageService } from '../../../services/background-images.service';

@Component({
  selector: 'component-home-background',
  templateUrl: './home-background.component.html',
  styleUrls: ['./home-background.component.scss'],
  providers: [BackgroundImageService],
})
export class HomeBackgroundComponent implements OnInit {
  constructor(private backgroundImageService: BackgroundImageService) {}
  backgroundImageMetaData: {
    id: string;
    photoURL: string;
    author: string;
    backgroundURL: string;
  }[];

  defaultImage: string = '../../../assets/images/monday.jpg';
  username: string = ', Anthony.';
  currentDay: string = moment().format('dddd').toLocaleLowerCase();
  imageLocation: string = '../../../assets/images/';
  authorToDisplay: string = '';
  photoURL: string = '';
  backgroundImageToDisplay: string = '';
  currentUser = localStorage.getItem('user');
  // This method rotates the daily image based on day of the week
  // This method will eventually include 7 images, one used as a fall back
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
  }
}
