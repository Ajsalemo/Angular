import { Component, Input } from '@angular/core';

@Component({
    selector: 'footer-loading-indicator',
    templateUrl: './footer-loading-indicator.component.html',
    styleUrls: ['./footer-loading-indicator.component.scss'],
})
export class FooterLoadingIndicator {
    @Input() isLoading: boolean;
}
