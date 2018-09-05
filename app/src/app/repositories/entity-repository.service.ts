import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Entity, EntityType } from '../models/entity';
import { FileModel, FileType } from '../models/file-model';

@Injectable({
    providedIn: 'root'
})
export class EntityRepository {
    private folderPreviewPath = './assets/folder.png';
    private filePreviewPath = './assets/file.png';
    GetFilesEntity(file: FileModel): Entity {
        if (file.fileType === FileType.image) {
            return new Entity(file.path,
                EntityType.image,
                environment.fileSystemApiUrl + '/preview/' + file.path,
                environment.fileSystemApiUrl + '/files/' + file.path);
        }
        return new Entity(file.path,
            EntityType.other,
            this.filePreviewPath,
            environment.fileSystemApiUrl + '/files/' + file.path);
    }
    GetFolderEntity(path: string): Entity {
        return new Entity(path, EntityType.folder, this.folderPreviewPath, null);
    }
}
