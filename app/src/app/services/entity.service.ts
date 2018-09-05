import { Injectable } from '@angular/core';
import { Entity } from '../models/entity';
import { CurrentFolderService } from './current-folder.service';
import { EntityRepository } from '../repositories/entity-repository.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  getEntities(): Entity[] {
    const entities: Entity[] = [];

    if (this.folderInfo.folderContent == null) {
      return entities;
    }

    this.folderInfo.folderContent.childFolders.forEach(folder => {
      entities.push(this.filesRepository.GetFolderEntity(folder));
    });

    this.folderInfo.folderContent.files.forEach(file => {
      entities.push(this.filesRepository.GetFilesEntity(file));
    });

    return entities;
  }

  constructor(private folderInfo: CurrentFolderService,
              private filesRepository: EntityRepository) {
  }
}
