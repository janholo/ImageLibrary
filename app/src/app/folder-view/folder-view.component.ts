import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ImageSizeService, ImageSize } from '../image-size.service';
import { FolderHierarchyService } from '../folder-hierarchy.service';
import { Folder } from '../folder';
import { Entity, EntityType } from '../entity';
import { EntityService } from '../entity.service';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})

export class FolderViewComponent implements OnInit {
  constructor(private imageSizeService: ImageSizeService,
              private folderHierarchyService: FolderHierarchyService,
              private imageService: EntityService,
              private route: ActivatedRoute,
              private router: Router) { }
  selectedImage: Entity = null;
  isCreateFolderOpen: Boolean = false;
  isImageSize(size, img = null): boolean {
    if (img !== null && this.isSelectedImage(img)) {
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
  getImages(): Entity[] {
    return this.imageService.getEntities();
  }
  selectElement(el: Entity) {
    if (el.type === EntityType.folder) {
      this.router.navigate([el.getName()], {relativeTo : this.route});
    } else if (el.type === EntityType.image) {
      if (this.isSelectedImage(el)) {
        this.selectedImage = null;
      } else {
        this.selectedImage = el;
      }
    } else {
      window.open(el.getSourcePath(), '_blank');
    }
  }
  createFolder(name: string) {
    this.isCreateFolderOpen = false;
  }

  ngOnInit() {

  }

}
