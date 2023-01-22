import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { MessageParsingService } from '../services/message-parsing.service';
import { ParseEvent } from '../services/parse-event';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  private _serviceSubscription;
  yearMap: Map<string, Message[]>;
  messages: Message[];
  obMessages = Observable<Message[]>;

  constructor(private messageParsingService: MessageParsingService) {
    this.messages = [];
    this.yearMap = new Map();
    this._serviceSubscription = this.messageParsingService.onParseComplete.subscribe({
      next: (event: ParseEvent) => {
          console.log('Received message', event.message);
          this.messages.push(event.message);
          console.log('chat view component msgs1: ', this.messages);
      }
    })  
  }

  ngOnInit(): void {
    console.log('chat view component msgs: ', this.messages);
    const mockMessages: Message[] = [
    new Message(new Date(), true, "Message contents...."),
    new Message(new Date(), true, "Lorum Ipsum"),
    new Message(new Date(), false, "Hello world..."),
    new Message(new Date(), true, "Message contents 2 ....")
    ]
    //this.messages.push(new Message(new Date(), true, "Message contents 1 ...."));
    //this.messages.push(new Message(new Date(), false, "Message contents 2 ...."));
  }

  addMessage(message: Message): void{
    const year = message.timestamp.getFullYear().toString();
    console.log("year: ", year);
    if (this.yearMap.has(year) == false){
      console.log("Adding new year to map");
      this.yearMap.set(year, new Array<Message>());
    }
    this.yearMap.get(year)!.push(message);
  }
}
