import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { Message } from '../models/message';

@Injectable()
export class MessageService {
  $allMessages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  $progressValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  public addMessage(message: Message) {
    this.$allMessages.next([...this.$allMessages.getValue(), message]);
  }

  public clearAllMessages(): void {
    this.$allMessages = new BehaviorSubject<Message[]>([]);
  }

  public $getAllMessages(): Observable<Message[]> {
    return this.$allMessages.asObservable();
  }

  public $getFilteredMessages(date: Date): Observable<Message[]> {
    console.log("filtering for ", date);
    return this.$allMessages.pipe(map((messages: Message[]) =>
        messages.filter(message => new Date(message.timestamp).getMonth() ==  date.getMonth()
        && new Date(message.timestamp).getFullYear() == date.getFullYear()))
      )
  }

  public $getLoadingPercentage(totalMessages: number): Observable<number> {
    const onePercent = totalMessages / 100;
    const currentPercent = this.$allMessages.pipe.length / onePercent;
    this.$progressValue.next(currentPercent);
    return this.$progressValue.asObservable();
  }
}