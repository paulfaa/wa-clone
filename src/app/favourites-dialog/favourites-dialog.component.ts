import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from '../models/message';
import { MessageParsingService } from '../services/message-parsing.service';

@Component({
  selector: 'app-favourites-dialog',
  templateUrl: './favourites-dialog.component.html',
  styleUrls: ['./favourites-dialog.component.scss']
})
export class FavouritesDialogComponent implements OnInit {

  public name = '';
  public favourites: Message[];

  constructor(
    private messageParsingService: MessageParsingService,
    public dialogRef: MatDialogRef<FavouritesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message[],
  ) {
    this.favourites = data;
  }

  ngOnInit(): void {
    this.name = this.messageParsingService.participant;
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public scrollToMessage(messageId: number | undefined){
    this.closeDialog();
    try{
      if(messageId && messageId != null){
        console.log(messageId)
        let el = document.getElementById(messageId.toString());
        console.log(el)
        el!.scrollIntoView({behavior: 'smooth'});
      }
    }
    catch(e){
      console.log("Element not found on page" + e);
      throw(e);
    }
  }
}