import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ImageSizeService, ImageSize } from '../services/image-size.service';
import { FolderHierarchyService } from '../services/folder-hierarchy.service';
import { Folder } from '../models/folder';
import { Entity, EntityType } from '../models/entity';
import { EntityService } from '../services/entity.service';
import { CurrentFolderService } from '../services/current-folder.service';
import { FilesRepository } from '../repositories/files-repository.service';
import { FolderRepository } from '../repositories/folder-repository.service';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})

export class FolderViewComponent implements OnInit {
  constructor(private imageSizeService: ImageSizeService,
    private folderHierarchyService: FolderHierarchyService,
    private imageService: EntityService,
    private currentFolderService: CurrentFolderService,
    private route: ActivatedRoute,
    private router: Router,
    private filesRepository: FilesRepository,
    private folderRepository: FolderRepository) { }
  selectedImage: Entity = null;
  isCreateFolderOpen: Boolean = false;
  isDeleteFileOpen: Boolean = false;
  isDeleteFolderOpen: Boolean = false;
  entityToDelete: Entity;
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
  isFolderLoaded(): boolean {
    return this.currentFolderService.folderContent != null;
  }
  getEntities(): Entity[] {
    return this.imageService.getEntities();
  }
  selectElement(el: Entity) {
    if (el.type === EntityType.folder) {
      this.router.navigate([el.getName()], { relativeTo: this.route });
    } else if (el.type === EntityType.image) {
      if (this.isSelectedImage(el)) {
        this.selectedImage = null;
      } else {
        this.selectedImage = el;
      }
    } else {
      window.open(el.sourcePath, '_blank');
    }
  }
  createFolder(name: string) {
    this.currentFolderService.createFolder(name);
    this.isCreateFolderOpen = false;
  }
  tryDeleteEntity(entity: Entity) {
    this.entityToDelete = entity;
    if (entity.type !== EntityType.folder) {
      this.isDeleteFileOpen = true;
    } else {
      this.isDeleteFolderOpen = true;
    }
  }
  deleteFile(entity: Entity) {
    this.filesRepository.DeleteFile(entity.path).subscribe(() => {},
                                                           (error) => console.log(error),
                                                           () => this.currentFolderService.reload());
    this.isDeleteFileOpen = false;
  }
  deleteFolder(entity: Entity) {
    this.folderRepository.DeleteFolder(entity.path).subscribe(() => {},
                                                           (error) => console.log(error),
                                                           () => this.currentFolderService.reload());
    this.isDeleteFolderOpen = false;
  }
  isFavorite(entity: Entity) {
    if (entity.type !== EntityType.image) {
      return false;
    }
    return true;
  }
  toggleFavorite(entity: Entity) {

  }

  ngOnInit() {

  }

}
