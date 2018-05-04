import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderViewComponent } from './folder-view/folder-view.component';
import { RawViewComponent } from './raw-view/raw-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/folderview', pathMatch: 'full' },
  {path: 'folderview', component: FolderViewComponent},
  {path: 'rawview', component: RawViewComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
