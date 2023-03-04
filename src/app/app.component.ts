import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FavouritesDialogComponent } from './favourites-dialog/favourites-dialog.component';
import { Message } from './models/message';
import { MessageService } from './services/message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wa';
  fileContent = '';

  test: Message[];

  constructor(private router: Router,
              private messageService: MessageService,
              private dialog: MatDialog
  ){
    this.test=[];
    this.test.push(new Message(new Date, true, "test inject data"));
  }

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | undefined;
  file: any;

  public isViewRoute() {
    return this.router.url === '/view';
  }

  public callClearMessages():void{
    if(this.isViewRoute()){
      this.messageService.clearAllMessages();
    }
  }

  openFavouritesDialog(): void {
    let dialogRef = this.dialog.open(FavouritesDialogComponent, {
      width: '80%',
      data: this.test,
      position: {top: '150px'} 
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

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
