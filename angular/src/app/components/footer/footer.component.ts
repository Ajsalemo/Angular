import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() authorToDisplay: string;
  @Input() photoURL: string;
}
