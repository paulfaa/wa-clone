import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { MessageParsingService } from '../services/message-parsing.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  messages: Message[] = [];

  constructor(
    private messageParsingService: MessageParsingService
  ) { 
  }


  ngOnInit(): void {
    this.messages = this.messageParsingService.getAllMessages();
  }

}
