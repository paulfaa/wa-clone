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
  messageContents: string;
  isChatOwner: boolean;

  constructor(message: Message) { 
    this.messageDate = message.timestamp;
    this.messageContents = message.text;
    this.isChatOwner = message.fromMe;
  }

  ngOnInit(): void {
  }
}
