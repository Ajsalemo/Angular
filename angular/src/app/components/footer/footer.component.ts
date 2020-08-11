import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authServiceFooter: AuthService, private router: Router) {}

  toggleGeneralState(e: any): void {
    this.generalOpenState = !this.generalOpenState;
    e.stopPropagation();
  }

  logUserIn(): void {
    this.router.navigate(['']);
  }

  logUserOut(): void {
    this.authServiceFooter.logout();
    this.router.navigate(['']);
  }
}
