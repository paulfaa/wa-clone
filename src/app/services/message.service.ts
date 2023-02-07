import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';
import { MessageParsingService } from './message-parsing.service';

@Injectable()
export class MessageService {
  private _serviceSubscription: any;
  $messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  $progressValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  messages: Message[];

  constructor() {
    this.messages = [];
  }

  public addMessage(message: Message) {
    //console.log('Received message from parseEvent', message);
    this.$messages.next([...this.$messages.getValue(), message]);
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