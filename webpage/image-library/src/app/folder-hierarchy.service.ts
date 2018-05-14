import { Injectable } from '@angular/core';
import { Folder } from './folder';
import { FolderInfoLoaderService } from './folder-info-loader.service';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(private infoLoader: FolderInfoLoaderService,
              private router: Router) {
    this.changeFolder('');

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const folderViewPrefixUrl = '/folderview';
        if (val.urlAfterRedirects.startsWith(folderViewPrefixUrl)) {
          const folderUrl = val.urlAfterRedirects.replace(folderViewPrefixUrl, '');
          this.changeFolder(folderUrl);
        }
      }
    });
   }
}
