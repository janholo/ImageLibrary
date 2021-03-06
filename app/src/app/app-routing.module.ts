import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { FolderViewComponent } from './folder-view/folder-view.component';

export function folderviewMatcher(url: UrlSegment[]) {
  return url.length >= 1 && url[0].path === 'folderview' ? ({consumed: url}) : null;
}

const routes: Routes = [
  {path: '', redirectTo: '/folderview', pathMatch: 'full' },
  {path: 'folderview', component: FolderViewComponent},
  { matcher: folderviewMatcher, component: FolderViewComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
