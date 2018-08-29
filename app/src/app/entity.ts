import { DataUriService } from './data-uri.service';

export enum EntityType {
    folder = 0,
    image,
    video,
    other
  }

export class Entity {
    path: string;
    type: EntityType;
    constructor(private dataUriService: DataUriService, path: string, type: EntityType) {
        this.path = path;
        this.type = type;
      }
    getPreviewPath(): string {
        if (this.type === EntityType.folder) {
            return './assets/folder.png';
        } else if (this.type === EntityType.other) {
            return './assets/file.png';
        }

        return this.dataUriService.getDataUri() + '/preview/' + this.path;
    }
    getSourcePath(): string {
        if (this.type === EntityType.folder) {
            return null;
        }

        return this.dataUriService.getDataUri() + '/files/' + this.path;

    }
    getName(): string {
        const l = this.path.split('/');
        return l[l.length - 1];
    }
}
