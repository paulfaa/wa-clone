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

  public favourites: Message[] = [
    new Message(new Date(2020, 10, 12), true, "Message contents...."),
    new Message(new Date(2020, 10, 12), true, "Lorum Ipsum"),
    new Message(new Date(2020, 10, 12), false, "Hello world..."),
    new Message(new Date(2020, 10, 12), true, "Message contents 2 ...."),
    new Message(new Date(2020, 10, 12), true, "Message contents...."),
    new Message(new Date(2020, 10, 12), true, "Lorum Ipsum"),
    new Message(new Date(2020, 10, 12), false, "Hello world..."),
    new Message(new Date(2020, 10, 12), true, "Message contents 2 ....")
  ];

  constructor(
    private messageParsingService: MessageParsingService,
    public dialogRef: MatDialogRef<FavouritesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, //inject favourites on open
  ) {}

  ngOnInit(): void {
    this.name = this.messageParsingService.participant;
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public scrollToMessage(messageId: number | undefined){
    this.closeDialog();
    if(messageId && messageId != null){
      let el = document.getElementById(messageId.toString());
      el!.scrollIntoView({behavior: 'smooth'});
    }
    else{
      console.log("HTML element with id " + messageId + " doesn't exist");
    }
  }
}