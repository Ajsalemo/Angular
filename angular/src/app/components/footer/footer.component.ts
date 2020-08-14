import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
  panelOpenState: boolean = false;
  generalOpenState: boolean = true;
  photoOpenState: boolean = false;
  isLinks: boolean = false;
  isSearch: boolean = false;
  isWeather: boolean = false;
  isTodo: boolean = false;

  constructor(private authServiceFooter: AuthService, private router: Router) {}

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

  toggleGeneralMenuPersonalization(isBoundProperty: string) {
    console.log(isBoundProperty)
    switch (isBoundProperty) {
      case 'isLinks':
        this.isLinks = !this.isLinks;
        console.log(this.isLinks);
        break;
      case 'isSearch':
        this.isSearch = !this.isSearch;
        console.log(this.isSearch);
        break;
      case 'isWeather':
        this.isWeather = !this.isWeather;
        console.log(this.isWeather);
        break;
      case 'isTodo':
        this.isTodo = !this.isTodo;
        console.log(this.isTodo);
        break;
      default:
        break;
    }
  }

  logUserIn(): void {
    this.router.navigate(['']);
  }

  logUserOut(): void {
    this.authServiceFooter.logout();
    this.router.navigate(['']);
  }
}
