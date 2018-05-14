import { Injectable } from '@angular/core';

import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUriService {
  getDataUri(): string {
    if (isDevMode()) {
      return 'http://mediaserver.local/data/';
    }

    return window.location.protocol + '//' + window.location.host + '/data';
  }

  constructor() { }
}
