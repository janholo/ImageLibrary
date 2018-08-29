import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataUriService {
  getDataUri(): string {
    // return window.location.protocol + '//' + window.location.host + '/data';
    return environment.fileSystemApiUrl;
  }

  constructor() { }
}
