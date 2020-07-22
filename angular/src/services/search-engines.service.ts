import { Injectable } from '@angular/core';
import { SEARCH_ENGINES } from '../app/api/search-engines';

@Injectable()
export class SearchEngineService {
  getSearchEngines() {
      return SEARCH_ENGINES;
  }
}
