import { Component, Input } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'component-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavbarComponent {
  @Input() parentIsLinks: boolean;
  @Input() parentIsSearch: boolean;
  @Input() parentIsWeather: boolean;
}
