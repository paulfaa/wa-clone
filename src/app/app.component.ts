import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wa';

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | undefined;
  file: any;

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    console.log("OnFileDropped called")
    //this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowserHandler(file: any) {
    console.log("fileBrowserHandler triggered")
    //this.prepareFilesList(files);
  }
}
