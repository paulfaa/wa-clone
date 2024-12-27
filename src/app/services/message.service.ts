import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { WhatsappMessage } from '../models/models';

@Injectable()
export class MessageService {
  $allMessages: BehaviorSubject<WhatsappMessage[]> = new BehaviorSubject<WhatsappMessage[]>([]);
  $progressValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  public addMessage(message: WhatsappMessage) {
    this.$allMessages.next([...this.$allMessages.getValue(), message]);
  }

  public addMessages(messages: WhatsappMessage[]) {
    this.$allMessages.next(messages);
  }

  public clearAllMessages(): void {
    this.$allMessages = new BehaviorSubject<WhatsappMessage[]>([]);
  }

  public $getAllMessages(): Observable<WhatsappMessage[]> {
    return this.$allMessages.asObservable();
  }

  public $getFilteredMessages(date: Date): Observable<WhatsappMessage[]> {
    console.log("Filtering for", date);
    return this.$allMessages.pipe(
      map((messages: WhatsappMessage[]) =>
        messages.filter(message => {
          return message.timestamp.getMonth() === date.getMonth() &&
          message.timestamp.getFullYear() === date.getFullYear();
        })
      )
    );
  }

  public $getLoadingPercentage(totalMessages: number): Observable<number> {
    const onePercent = totalMessages / 100;
    const currentPercent = this.$allMessages.pipe.length / onePercent;
    this.$progressValue.next(currentPercent);
    return this.$progressValue.asObservable();
  }
}