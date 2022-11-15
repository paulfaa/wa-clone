import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { MessageParsingService } from '../services/message-parsing.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  messages: Message[];
  //private messageParsingService: MessageParsingService;

  constructor() {
    this.messages = [];
    //this.messageParsingService = new MessageParsingService();
  }

  ngOnInit(): void {
    //this.messages = this.messageParsingService.getAllMessages();
    const mockMessages: Message[] = [
    new Message(new Date(), "User1", "Message contents....", true),
    new Message(new Date(), "User1", "Lorum Ipsum", true),
    new Message(new Date(), "User2", "Hello world...", false),
    new Message(new Date(), "User1", "Message contents 2 ....", true)
    ]
    this.messages = mockMessages;
  }

}
