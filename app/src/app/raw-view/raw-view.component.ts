import { Component, OnInit, SecurityContext } from '@angular/core';
import { DataUriService } from '../data-uri.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-raw-view',
  templateUrl: './raw-view.component.html',
  styleUrls: ['./raw-view.component.css']
})
export class RawViewComponent implements OnInit {
  constructor(private dataUriService: DataUriService,
              private sanitizer: DomSanitizer) { }
  rawViewUri: SafeResourceUrl = '';
  ngOnInit() {
    this.rawViewUri = this.sanitizer.bypassSecurityTrustResourceUrl(this.dataUriService.getDataUri());
  }

}
