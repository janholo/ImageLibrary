import { Component, OnInit } from '@angular/core';
import { FileUploadState } from './file-upload-state';
import { FilesRepository } from '../repositories/files-repository.service';
import { CurrentFolderService } from '../services/current-folder.service';
import { Observable, forkJoin } from 'rxjs';

export enum FileUploadComponentState {
  noFilesSelected = 0,
  filesSelected = 1,
  uploading = 2,
  uploadSuccessfull = 3,
  uploadFailed = 4,
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  constructor(private filesRepository: FilesRepository, private currentFolderService: CurrentFolderService) { }
  private _isOpen = false;
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(newValue: boolean) {
    this._isOpen = newValue;
    this.state = FileUploadComponentState.noFilesSelected;
    this.files = null;
    this.fileUploads = [];
  }

  state: FileUploadComponentState;
  files: FileList;
  fileUploads: FileUploadState[];
  filesChanged(val: FileList) {
    this.files = val;
    this.fileUploads = [];
    for (let i = 0; i < this.files.length; i++) {
      this.state = FileUploadComponentState.filesSelected;
      const file = this.files[i];
      this.fileUploads.push(new FileUploadState(file));
    }
  }
  upload() {
    this.state = FileUploadComponentState.uploading;

    const observableBatch = [];

    for (const f of this.fileUploads) {
      observableBatch.push(this.filesRepository.UploadFile(this.currentFolderService.folderContent.path, f));
    }

    forkJoin(observableBatch).subscribe(
      () => {},
      () => this.state = FileUploadComponentState.uploadFailed,
      () => this.state = FileUploadComponentState.uploadSuccessfull);

  }
  uploadDone() {
    this.isOpen = false;

    this.currentFolderService.reload();
  }
  ngOnInit() {
  }
}
