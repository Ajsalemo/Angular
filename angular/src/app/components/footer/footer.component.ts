import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'component-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() authorToDisplay: string;
  @Input() photoURL: string;
  @Input() currentUser: string;
  panelOpenState: boolean = false;

  constructor(private authServiceFooter: AuthService, private router: Router) {}

  logUserOut(): void {
    this.authServiceFooter.logout();
    this.router.navigate(['']);
  }
}
