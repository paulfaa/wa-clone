import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message!: Message;

  messageDate: Date;
  author: string;
  messageContents: string;
  isChatOwner: boolean;

  constructor(message: Message) { 
    this.messageDate = message.messageDate;
    this.author = message.author;
    this.messageContents = message.messageContents;
    this.isChatOwner = message.isChatOwner;
  }

  ngOnInit(): void {
  }

}
