import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { WhatsappMessage } from '../models/models';
import { MessageType } from '../models/message-type';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnChanges {

  @Input() messageInput!: WhatsappMessage;

  @Output() toggleFavouriteEvent: EventEmitter<WhatsappMessage> = new EventEmitter();

  id!: string;
  timestamp: Date = new Date();
  fromMe: boolean = false;
  text?: string;
  filename?: string;
  caption?: string;
  location?: string;
  duration?: number;
  link?: string;
  isFavourite: boolean = false;
  type?: MessageType;

  constructor() { }

  //ngOnChanges(): void {
  ngOnChanges(changes: SimpleChanges): void {
    this.id = this.messageInput.id;
    this.timestamp = this.messageInput.timestamp;
    this.fromMe = this.messageInput.fromMe;
    this.isFavourite = this.messageInput.isFavourite!;
    this.type = this.messageInput.type;
    //switch(this.type){
    //  case: 
    //}
    if (this.messageInput.text) {
      this.text = this.messageInput.text;
    }
    else if (this.messageInput.duration) {
      this.duration = this.messageInput.duration;
      this.filename = this.messageInput.filename;
      console.log(this.filename);
    }
    else if (this.messageInput.filename) {
      this.filename = this.messageInput.filename;
      this.caption = this.messageInput.caption;
    }
    else if (this.messageInput.link) {
      this.link = this.messageInput.link;
      this.caption = this.messageInput.caption;
    }
    else if (this.messageInput.location) {
      this.location = this.messageInput.location;
    }
  }

  public toggleFavourite(): void {
    console.log("id of message clicked: ", this.id);
    this.isFavourite = !this.isFavourite;
    this.toggleFavouriteEvent.emit(this.messageInput);
  }
}

/* {
  "timestamp": "2017-02-18T23:36:41Z",
  "id": "3A59C8731D4FF5E64338E9644DE86E",
  "fromMe": false,
  "quotedTimestamp": "2017-02-18T23:02:39Z",
  "quotedMessageId": "5E270509FEE2DC2EC3D58B8A5B32FC",
  "type": "text",
  "text": "Das"
} */