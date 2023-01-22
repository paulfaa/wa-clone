import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { MessageParsingService } from '../services/message-parsing.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  public _serviceSubscription: Observable<Message[]>;
  selectedYear: number | undefined;
  yearMap: Map<number, Message[]>;
  yearKeys: number[];
  messages: Message[];
  obMessages = Observable<Message[]>;

  constructor(private messageService: MessageService,
              private messageParsingService: MessageParsingService
    ) {
    this._serviceSubscription = this.messageService.$getMessages();
    this._serviceSubscription.subscribe((r) => console.log(r));
    this.messages = [];
    this.yearMap = new Map();
    this.yearKeys = [];
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
    //this.setKeys();
  }

  private setKeys(): void{
    this.yearKeys = Array.from(this.yearMap.keys());
    console.log(this.yearKeys)
  }

  public setSelectedYear(year: number): void{
    this.selectedYear = year;
  }

  public getMessagesForSelectedYear(): Message[]{
    try{
      return this.yearMap.get(this.selectedYear!)!;
    }
    catch(e){
      console.log("No messages for year" + this.selectedYear + e);
      throw(e);
    }
  }

  public addMessage(message: Message): void{
    const year = message.timestamp.getFullYear();
    if (this.yearMap.has(year) == false){
      this.yearMap.set(year, new Array<Message>());
    }
    this.yearMap.get(year)!.push(message);
  }
}
