import { Injectable } from '@angular/core';
import { Entity, EntityType } from './entity';
import { FolderInfoLoaderService } from './folder-info-loader.service';
import { FolderHierarchyService } from './folder-hierarchy.service';
import { DataUriService } from './data-uri.service';
import { FileType } from './file-model';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  getEntities(): Entity[] {
    const entities: Entity[] = [];

    this.folderInfo.info.childFolders.forEach(folder => {
      entities.push(new Entity(this.dataUriService, folder, EntityType.folder));
    });

    this.folderInfo.info.files.forEach(file => {
      if (file.fileType === FileType.image) {
        entities.push(new Entity(this.dataUriService, file.path, EntityType.image));
      } else {
        entities.push(new Entity(this.dataUriService, file.path, EntityType.other));
      }

    });

    return entities;
  }

  constructor(private folderInfo: FolderInfoLoaderService,
              private folderHierarchy: FolderHierarchyService,
              private dataUriService: DataUriService) { }
}
