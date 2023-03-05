import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FavouritesDialogComponent } from './favourites-dialog/favourites-dialog.component';
import { Message } from './models/message';
import { MessageService } from './services/message.service';
import { MessageBuilder } from './util/message-builder';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fileContent = '';

  favourites: Message[];

  constructor(private router: Router,
              private messageService: MessageService,
              private dialog: MatDialog
  ){
    this.favourites=[];
    this.favourites.push(new MessageBuilder().id(1).timestamp(new Date).fromMe(true).text("Test dialog injection").build());
    this.favourites.push(new MessageBuilder().id(4).timestamp(new Date).fromMe(false).text("ID 4").build());
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

  public openFavouritesDialog(): void {
    let dialogRef = this.dialog.open(FavouritesDialogComponent, {
      width: '80%',
      data: this.favourites,
      //data: this.messageService.getFavourites(),  //todo
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
