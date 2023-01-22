import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable()
export class MessageService {
  private _serviceSubscription: any;
  $messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
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
}