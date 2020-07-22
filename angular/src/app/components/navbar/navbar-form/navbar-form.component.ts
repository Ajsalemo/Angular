import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchEngineService } from '../../../../services/search-engines.service';

@Component({
  selector: 'navbar-form-component',
  styleUrls: ['./navbar-form.component.scss'],
  templateUrl: './navbar-form-component.html',
  providers: [SearchEngineService],
})
export class NavbarFormComponent implements OnInit {
  constructor(private searchEnginesService: SearchEngineService) {}
  searchEngines: {
    id: number;
    name: string;
    provider: string;
    icon: string;
    loadingGif: string;
  }[];

  searchEnginesFunction(): void {
    this.searchEngines = this.searchEnginesService.getSearchEngines();
  }

  searchGroup = new FormGroup({
    search: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
    selectDropdown: new FormControl(''),
  });

  // This concatenates the search provider URL and the search query to form a valid URL through the provider
  // After submitting the form, it opens in a new window with the results
  submitForm(data: { search: string; selectDropdown: any }) {
    const searchQuery: string = data.search;
    // If the selected dropdown doesn't exist or is submitted as an empty string, then set the default provider to Google
    const searchEngineProvider: string =
      data.selectDropdown === '' || !data.selectDropdown
        ? this.searchEngines[0].provider
        : data.selectDropdown;

    const windowTarget: string = '_blank';
    window.open(`${searchEngineProvider}${searchQuery}`, windowTarget);
  }

  ngOnInit(): void {
    this.searchEnginesFunction();
  }
}
