import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';
import { FavouritesService } from '../services/favourites.service';
import { MessageParsingService } from '../services/message-parsing.service';
import { WhatsappMessage } from '../models/models';
import DateUtils from '../util/date-util';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatViewComponent implements OnInit {
  public _serviceSubscription: Observable<WhatsappMessage[]> | undefined;
  public selectedYear: number | undefined;
  public selectedMonth: number | undefined;

  constructor(private messageService: MessageService,
    private favouritesService: FavouritesService,
    private messageParsingService: MessageParsingService) {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(){
    this.favouritesService.downloadFavouritedMessages(); 
  }

  ngOnInit(): void {
    this._serviceSubscription = this.messageService.$getFilteredMessages(this.getFirstDate());
    this._serviceSubscription.subscribe();
  }

  public updateDateFilter(event: Date): void {
    console.log("dateSelectEvent emitted ", event);
    this._serviceSubscription = this.messageService.$getFilteredMessages(event);
    //need to also traverse all filtered msgs and apply whether favourited or not
    //can create a set of all favourited msgs
    //const favouritedIds = this.favouritesService.getFavourites().keys();
    //favouritedIds.
  }

  public logEvent(event: any): void {
    //get messageDate from event
    console.log(event);
  }

  public toggleFavourite(eventMessage: WhatsappMessage): void {
    const id = eventMessage.id!;
    if (this.favouritesService.isFavourite(id)) {
      this.favouritesService.removeFromFavourites(id);
    }
    else {
      this.favouritesService.addToFavourites(eventMessage);
    }
  }

  private getFirstDate(): Date{
    const yearMonthMap = this.messageParsingService.getYearMonthMap();
    const date = DateUtils.getFirstDateFromMap(yearMonthMap);
    this.selectedYear = date.getFullYear();
    this.selectedMonth = date.getMonth() + 1; //getMonth is 0 index
    return date;
  }
}
