import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ImageSizeService, ImageSize } from '../image-size.service';
import { FolderHierarchyService } from '../folder-hierarchy.service';
import { Folder } from '../folder';
import { Image, ImageType } from '../image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})

export class FolderViewComponent implements OnInit {
  constructor(private imageSizeService: ImageSizeService,
              private folderHierarchyService: FolderHierarchyService,
              private imageService: ImageService,
              private route: ActivatedRoute,
              private location: Location) { }
  selectedImage: Image = null;
  isImageSize(size, img): boolean {
    if (this.isSelectedImage(img)) {
      return size === 3;
    }
    return this.imageSizeService.isImageSize(size);
  }
  isSelectedImage(img): boolean {
    return this.selectedImage != null && img.path === this.selectedImage.path;
  }
  getFolderHierarchy(): Folder[] {
    return this.folderHierarchyService.getHierarchy();
  }
  selectElement(el: Image) {
    if (el.type === ImageType.Folder) {
      this.changeFolder(el.path);
    } else if (el.type === ImageType.Image) {
      if (this.isSelectedImage(el)) {
        this.selectedImage = null;
      } else {
        this.selectedImage = el;
      }
    } else {
      window.open(el.getSourcePath(), '_blank');
    }
  }
  changeFolder(path): void {
    this.selectedImage = null;
    this.folderHierarchyService.changeFolder(path);
  }
  getImages(): Image[] {
    return this.imageService.getImages();
  }

  ngOnInit() {
    const folderUrl = this.route.snapshot.url;
    console.log(folderUrl);

    let newPath = '';

    for (let i = 1; i < folderUrl.length; i++) {
      newPath += folderUrl[i] + '/';
    }

    newPath = newPath.slice(0, -1);

    this.changeFolder(newPath);
  }

}
