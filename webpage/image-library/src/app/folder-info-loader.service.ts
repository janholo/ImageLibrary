import { Injectable } from '@angular/core';
import { Folder } from './folder';
import { FolderInfo } from './folder-info';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FolderInfoLoaderService {
  info: FolderInfo;
  load(folder: Folder): void {
    this.info = {files: [], subDirectories: [], name: '', previewPath: '', sourcePath: ''};
    let infoFileUri = folder.getPreviewPath();
    infoFileUri += '/info.json';

    this.http.get<FolderInfo>(infoFileUri).subscribe((data: FolderInfo) => this.info = { ...data});
  }
  constructor(private http: HttpClient) { }
}
