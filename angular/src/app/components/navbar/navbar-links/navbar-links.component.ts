import { Component, ViewEncapsulation } from '@angular/core';
import { faChrome } from '@fortawesome/free-brands-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'navbar-links-component',
  styleUrls: ['./navbar-links.component.scss'],
  templateUrl: './navbar-links.component.html',
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarLinksComponent {
  navbarMenuText: string = 'Links';
  faChrome: object = faChrome;
  faTh: object = faTh;
}
