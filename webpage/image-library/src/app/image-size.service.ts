import { Injectable } from '@angular/core';

export enum ImageSize {
  Small = 0,
  Medium,
  Big,
  FullSize
}

@Injectable({
  providedIn: 'root',
})
export class ImageSizeService {
  imageSize = ImageSize.Medium;
  isImageSize(size): boolean {
    return size === this.imageSize;
  }
  setImageSize(size): void {
    this.imageSize = size;
  }
  constructor() { }
}
