import { Component, OnInit } from '@angular/core';
import { filter, flatMap, map, Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  public _serviceSubscription: Observable<Message[]>;
  selectedYear: number | undefined;
  selectedMonth: number | undefined;

  //move map logic to messageService
  yearMap: Map<number, Message[]>;
  yearKeys: number[];
  messages: Message[];

  constructor(private messageService: MessageService) {
    this._serviceSubscription = this.messageService.$getMessages();
/*     this._serviceSubscription = this._serviceSubscription.pipe(
      map(messages =>
        messages.filter(msg => new Date(msg.timestamp).getFullYear() == 2014)
      )
    ) */
    this._serviceSubscription.subscribe();
    /* map((arr:TaskReprintReasonCode[]) => {
             return arr.filter(r => r.reasonDescription === 'New');
        ) */

    //move logic to message service
    this.messages = [];
    this.yearMap = new Map();
    this.yearKeys = [2001, 2005, 2010, 2011, 2012, 2014, 2017, 2022, 2023];
  }

  ngOnInit(): void {
    //console.log('chat view component msgs: ', this.messages);

  }

  public updateSubscription(year: number): void {
    this._serviceSubscription = this.messageService.$getMessages();
    this._serviceSubscription.pipe(
      map(messages =>
        messages.filter(msg => new Date(msg.timestamp).getFullYear() == year)
      )
    ).subscribe();
  }

  private setKeys(): void {
    this.yearKeys = Array.from(this.yearMap.keys());
    console.log(this.yearKeys)
  }

  public setSelectedYear(year: number): void {
    this.selectedYear = year;
    this.updateSubscription(this.selectedYear);
  }

  public getMessagesForSelectedYear(): Message[] {
    try {
      return this.yearMap.get(this.selectedYear!)!;
    }
    catch (e) {
      console.log("No messages for year" + this.selectedYear + e);
      throw (e);
    }
  }

  public addMessage(message: Message): void {
    const year = message.timestamp.getFullYear();
    if (this.yearMap.has(year) == false) {
      this.yearMap.set(year, new Array<Message>());
    }
    this.yearMap.get(year)!.push(message);
  }
}
