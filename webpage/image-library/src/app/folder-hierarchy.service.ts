import { Injectable } from '@angular/core';
import { Folder } from './folder';
import { FolderInfoLoaderService } from './folder-info-loader.service';

@Injectable({
  providedIn: 'root'
})
export class FolderHierarchyService {
  private hierarchy: Folder[];
  getHierarchy(): Folder[] {
    return this.hierarchy;
  }
  getCurrentFolder(): Folder {
    return this.hierarchy[this.hierarchy.length - 1];
  }
  changeFolder(path): void {
    this.hierarchy = [new Folder('', true)];

    let cumulativePath = '';
    const folders = path.split('/');

    folders.forEach(element => {
      if (element !== '') {
        cumulativePath += element;
        this.hierarchy.push(new Folder(cumulativePath));
        cumulativePath += '/';
      }
    });

    this.infoLoader.load(this.getCurrentFolder());
  }


  constructor(private infoLoader: FolderInfoLoaderService) {
    this.changeFolder('');
   }
}
