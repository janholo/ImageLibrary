import { Injectable } from '@angular/core';
import { empty } from 'rxjs';
import { Image, ImageType } from './image';
import { FolderInfoLoaderService } from './folder-info-loader.service';
import { FolderHierarchyService } from './folder-hierarchy.service';
import { DataUriService } from './data-uri.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  getImages(): Image[] {
    const images: Image[] = [];

    const baseFolder = this.folderHierarchy.getCurrentFolder().path + '/';

    this.folderInfo.info.subDirectories.forEach(folder => {
      images.push(new Image(this.dataUriService, baseFolder + folder, ImageType.Folder));
    });

    this.folderInfo.info.files.forEach(file => {
      if (file.toLowerCase().endsWith('jpeg')
          || file.toLowerCase().endsWith('jpg')
          || file.toLowerCase().endsWith('png')
          || file.toLowerCase().endsWith('gif')
          || file.toLowerCase().endsWith('bmp')) {
        images.push(new Image(this.dataUriService, baseFolder + file, ImageType.Image));
      } else {
        images.push(new Image(this.dataUriService, baseFolder + file, ImageType.Other));
      }

    });

    return images;
  }

  constructor(private folderInfo: FolderInfoLoaderService,
              private folderHierarchy: FolderHierarchyService,
              private dataUriService: DataUriService) { }
}
