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
  selectedYear: number | undefined;
  yearMap: Map<number, Message[]>;
  yearKeys: number[];
  messages: Message[];
  obMessages = Observable<Message[]>;

  constructor(private messageParsingService: MessageParsingService) {
    this.messages = [];
    this.yearMap = new Map();
    this.yearKeys = [];
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
    this.addMessage(new Message(new Date(2020, 10, 12), true, "Message contents...."));
    this.addMessage(new Message(new Date(2020, 10, 13), true, "Message contents...."));
    this.addMessage(new Message(new Date(2021, 10, 12), true, "Message contents...."));
    this.setKeys();
  }

  public setSelectedYear(year: number): void{
    this.selectedYear = year;
  }

  private setKeys(): void{
    this.yearKeys = Array.from(this.yearMap.keys());
    console.log(this.yearKeys)
  }

  addMessage(message: Message): void{
    const year = Number(message.timestamp.getFullYear().toString());
    console.log("year: ", year);
    if (this.yearMap.has(year) == false){
      console.log("Adding new year to map");
      this.yearMap.set(year, new Array<Message>());
    }
    this.yearMap.get(year)!.push(message);
  }
}
