import { Component, OnInit } from '@angular/core';
import { FileUploadState } from './file-upload-state';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor() { }
  private _isOpen = false;
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(newValue: boolean) {
    this._isOpen = newValue;
    this.isUploading = false;
    this.filePaths = null;
    this.fileUploads = [];
  }

  isUploading: Boolean;
  filePaths: FileList;
  fileUploads: FileUploadState[];
  filesChanged(val: FileList) {
    this.filePaths = val;
    this.fileUploads = [];
    for (let i = 0; i < this.filePaths.length; i++) {
      const file = this.filePaths[i];
      this.fileUploads.push({ name: file.name, progress: 0 });
    }
  }
  upload() {
    this.isUploading = true;
  }
  ngOnInit() {
  }
}
