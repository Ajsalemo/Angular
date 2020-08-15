import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() currentUserId: number;
  panelOpenState: boolean = false;
  generalOpenState: boolean = true;
  photoOpenState: boolean = false;
  isLinks: boolean = false;
  isSearch: boolean = false;
  isWeather: boolean = false;
  isTodo: boolean = false;

  constructor(
    private authServiceFooter: AuthService,
    private accountServiceFooter: AccountService,
    private router: Router
  ) {}

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

  toggleGeneralMenuPersonalization(isBoundProperty: any) {
    const toggleSourceId = isBoundProperty.source.id;
    const isChecked = isBoundProperty.checked;
    switch (toggleSourceId) {
      case 'isLinks':
        this.isLinks = isChecked;
        this.accountServiceFooter.setAccountDashboardPreferences(
          this.isLinks,
          this.currentUserId
        );
        break;
      case 'isSearch':
        this.isSearch = isChecked;
        break;
      case 'isWeather':
        this.isWeather = isChecked;
        break;
      case 'isTodo':
        this.isTodo = isChecked;
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
