import { TestBed, inject } from '@angular/core/testing';

import { ImageSizeService } from './image-size.service';

describe('ImageSizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageSizeService]
    });
  });

  it('should be created', inject([ImageSizeService], (service: ImageSizeService) => {
    expect(service).toBeTruthy();
  }));
});
