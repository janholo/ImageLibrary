import { FileModel } from './file-model';

export interface FolderModel {
    'path': string;
    'files': FileModel[];
    'childFolders': string[];
  }
