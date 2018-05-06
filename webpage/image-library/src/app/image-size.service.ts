import { Injectable } from '@angular/core';

enum ImageSize {
  Small = 0,
  Medium,
  Big
}

@Injectable()
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
