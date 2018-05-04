import { Component, OnInit } from '@angular/core';
import { IMAGES, FOLDERS } from '../mock-images';
import { ImageSizeService } from '../image-size.service';


@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.css']
})
export class FolderViewComponent implements OnInit {
  images = IMAGES;
  folders = FOLDERS;
  constructor(private imageSizeService: ImageSizeService) { }
  isImageSize(size): boolean {
    return this.imageSizeService.isImageSize(size);
  }
  ngOnInit() {
  }

}
