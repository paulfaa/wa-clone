import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { WhatsappMessage, YearMonth } from '../models/models';
import DateUtils from '../util/date-util';

@Injectable()
export class MessageService {
  $allMessages: BehaviorSubject<Map<string, WhatsappMessage[]>> = new BehaviorSubject<Map<string, WhatsappMessage[]>>(new Map<string, WhatsappMessage[]>);
  $progressValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  public addMessages(messageMap: Map<string, WhatsappMessage[]>) {
    this.$allMessages.next(messageMap);
  }

  public clearAllMessages(): void {
    this.$allMessages = new BehaviorSubject<Map<string, WhatsappMessage[]>>(new Map<string, WhatsappMessage[]>);
  }

  public $getAllMessages(): Observable<Map<string, WhatsappMessage[]>> {
    return this.$allMessages.asObservable();
  }

  public $getFilteredMessages(yearMonth: YearMonth): Observable<WhatsappMessage[]> {
    const keyString = DateUtils.yearMonthToString(yearMonth);
    //const quotedMessages = this.messageParsingService.getQuoteMap().get(keyString);
    console.log("Filtering for", yearMonth);
    return this.$allMessages.pipe(
      map((messagesMap: Map<string, WhatsappMessage[]>) =>
        messagesMap.get(keyString)!.filter(message => {
          var messageDate = new Date(message.timestamp);
          return messageDate.getMonth() === yearMonth.month &&
          messageDate.getFullYear() === yearMonth.year;
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