import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WhatsappMessage } from '../models/models';
import { MessageType } from '../models/message-type';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {

  @Input() messageInput!: WhatsappMessage;


  @Output() toggleFavouriteEvent: EventEmitter<WhatsappMessage> = new EventEmitter();

  id?: number;
  timestamp: Date = new Date();
  fromMe: boolean = false;
  text?: string;
  filename?: string;
  caption?: string;
  location?: string;
  duration?: number;
  link?: string;
  isFavourite?: boolean = false;
  type?: MessageType;

  constructor() {}
  
  //ngOnChanges(): void {
  ngOnChanges(changes: SimpleChanges): void {
    this.id = this.messageInput.messageId;
    this.timestamp = this.messageInput.timestamp;
    this.fromMe = this.messageInput.fromMe;
    this.isFavourite = this.messageInput.isFavourite;
    this.type = this.messageInput.type;
    //switch(this.type){
    //  case: 
    //}
    if(this.messageInput.text){
      this.text = this.messageInput.text;
    }
    else if(this.messageInput.duration){
      console.warn("msg duration", this.messageInput.duration)
      this.duration = this.messageInput.duration;
    }
    else if(this.messageInput.filename){
      this.filename = this.messageInput.filename;
      this.caption = this.messageInput.caption;
    }
    else if(this.messageInput.link){
      this.link = this.messageInput.link;
      this.caption = this.messageInput.caption;
    }
    else if(this.messageInput.location){
      this.location = this.messageInput.location;
    }
  }

  public toggleFavourite(){
    console.log("id of message clicked: ", this.id);
    if (this.isFavourite == true){
      this.isFavourite = false;
    }
    else{
      this.isFavourite = true;
    }
    this.toggleFavouriteEvent.emit(this.messageInput);
  }
}