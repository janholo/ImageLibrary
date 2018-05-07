export enum ImageType {
    Folder = 0,
    Image,
    Other
  }

export class Image {
    path: string;
    type: ImageType;
    constructor(path: string, type: ImageType) {
        this.path = path;
        this.type = type;
      }
    getPreviewPath(): string {
        if (this.type === ImageType.Folder) {
            return '../assets/folder.png';
        } else if (this.type === ImageType.Other) {
            return '../assets/file.png';
        }

        return 'http://mediaserver.local/data/preview/' + this.path;
    }
    getSourcePath(): string {
        if (this.type === ImageType.Folder) {
            return null;
        }

        return 'http://mediaserver.local/data/images/' + this.path;

    }
    getName(): string {
        const l = this.path.split('/');
        return l[l.length - 1];
    }
}
