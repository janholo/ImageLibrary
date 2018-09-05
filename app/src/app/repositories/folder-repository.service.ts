import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { FolderModel } from '../models/folder-model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FolderRepository {
  CreateFolder(pathToFolder: string): Observable<{}> {
    const requestUri = environment.fileSystemApiUrl + '/folders/' + pathToFolder;

    return this.http.put(requestUri, null);
  }
  LoadFolderContent(path: string, result: (value: FolderModel) => void) {
    const infoFileUri = environment.fileSystemApiUrl + '/folders/' + path;

    this.http.get<FolderModel>(infoFileUri).subscribe(result);
  }
  constructor(private http: HttpClient) { }
}
