export enum FileType {
  none = 0,
  image = 1,
  video = 2,
  other = 3
}

export interface FileModel {
    'path': string;
    'fileType': FileType;
  }
