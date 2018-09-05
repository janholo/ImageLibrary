import { Injectable } from '@angular/core';
import { Folder } from '../models/folder';
import { FolderModel } from '../models/folder-model';
import { FolderRepository } from '../repositories/folder-repository.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentFolderService {
  folderContent: FolderModel;
  load(folder: Folder): void {
    this.folderContent = null;

    this.folderRepository.LoadFolderContent(folder.path, (data: FolderModel) => this.folderContent = { ...data});
  }
  private reload(): void {
    this.load(new Folder(this.folderContent.path));
  }
  createFolder(name: string) {
    this.folderRepository.CreateFolder(this.folderContent.path + '/' + name).subscribe(
      (value: {}) => this.reload());
  }
  constructor(private folderRepository: FolderRepository) { }
}
