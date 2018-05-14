import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
              private router: Router) { }
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
  getImages(): Image[] {
    return this.imageService.getImages();
  }

  selectElement(el: Image) {
    if (el.type === ImageType.Folder) {
      this.router.navigate([el.getName()], {relativeTo : this.route});
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

  ngOnInit() {

  }

}
