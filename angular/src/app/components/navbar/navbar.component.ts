import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() showLinks: boolean;
}
