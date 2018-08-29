import { Injectable } from '@angular/core';
import { Folder } from './folder';
import { FolderModel } from './folder-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolderInfoLoaderService {
  info: FolderModel;
  load(folder: Folder): void {
    this.info = {path: '', files: [], childFolders: []};
    const infoFileUri = environment.fileSystemApiUrl + '/folders/' + folder.path;

    this.http.get<FolderModel>(infoFileUri).subscribe((data: FolderModel) => this.info = { ...data});
  }
  constructor(private http: HttpClient) { }
}
