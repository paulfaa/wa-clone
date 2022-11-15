import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ChatViewComponent } from './chat-view/chat-view.component';

const routes: Routes = [
  { path: 'upload', component: FileUploadComponent },
  { path: 'view', component: ChatViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
