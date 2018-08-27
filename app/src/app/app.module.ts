import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { FolderViewComponent } from './folder-view/folder-view.component';
import { AppRoutingModule } from './/app-routing.module';
import { RawViewComponent } from './raw-view/raw-view.component';
import { ImageSizeService } from './image-size.service';
import { FileUploadComponent } from './file-upload/file-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    FolderViewComponent,
    RawViewComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
