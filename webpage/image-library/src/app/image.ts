import { DataUriService } from './data-uri.service';

export enum ImageType {
    Folder = 0,
    Image,
    Other
  }

export class Image {
    path: string;
    type: ImageType;
    constructor(private dataUriService: DataUriService, path: string, type: ImageType) {
        this.path = path;
        this.type = type;
      }
    getPreviewPath(): string {
        if (this.type === ImageType.Folder) {
            return './assets/folder.png';
        } else if (this.type === ImageType.Other) {
            return './assets/file.png';
        }

        return this.dataUriService.getDataUri() + '/preview/' + this.path;
    }
    getSourcePath(): string {
        if (this.type === ImageType.Folder) {
            return null;
        }

        return this.dataUriService.getDataUri() + '/images/' + this.path;

    }
    getName(): string {
        const l = this.path.split('/');
        return l[l.length - 1];
    }
}
