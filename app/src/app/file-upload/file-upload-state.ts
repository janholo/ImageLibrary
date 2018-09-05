export class FileUploadState {
  constructor(file: File) {
    this.file = file;
    this.progress = 0;
    this.isStarted = false;
    this.isDone = false;
    this.error = false;
  }
    file: File;
    progress: number;
    isStarted: boolean;
    isDone: boolean;
    error: boolean;
  }
