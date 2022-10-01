import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wa';
  fileContent = '';
  // example - https://stackblitz.com/edit/angular-file-read?file=app%2Fapp.component.ts

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | undefined;
  file: any;

  // public onChange(fileList: FileList): void {
  //   let file = fileList[0];
  //   let fileReader: FileReader = new FileReader();
  //   fileReader.onloadend = function(x) {
  //     var result = fileReader.result;
  //     this.fileContent = result;
  //   }
  //   fileReader.readAsText(file);
  // }

  // /**
  //  * on file drop handler
  //  */
  // onFileDropped($event: any) {
  //   console.log("OnFileDropped called")
  //   //this.prepareFilesList($event);
  // }

  // /**
  //  * handle file from browsing
  //  */
  // fileBrowserHandler(file: any) {
  //   console.log("fileBrowserHandler triggered")
  //   //this.prepareFilesList(files);
  // }

  
}
