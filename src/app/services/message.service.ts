import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable()
export class MessageService {
  $messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  $progressValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  public addMessage(message: Message) {
    this.$messages.next([...this.$messages.getValue(), message]);
  }

  public clearAllMessages(): void {
    this.$messages = new BehaviorSubject<Message[]>([]);
  }

  public $getMessages(): Observable<Message[]> {
    return this.$messages.asObservable();
  }

  public $getLoadingPercentage(totalMessages: number): Observable<number> {
    const onePercent = totalMessages / 100;
    const currentPercent = this.$messages.pipe.length / onePercent;
    this.$progressValue.next(currentPercent);
    return this.$progressValue.asObservable();
  }
}