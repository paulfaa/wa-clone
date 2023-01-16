import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message!: Message;

  timestamp: Date;
  fromMe: boolean;
  text: string;
  
  constructor(message: Message) { 
    this.timestamp = message.timestamp;
    this.text = message.text;
    this.fromMe = message.fromMe;
  }

  ngOnInit(): void {
  }
}
