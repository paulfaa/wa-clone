import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { FavouritesService } from '../services/favourites.service';
import { MessageParsingService } from '../services/message-parsing.service';
import { WhatsappMessage } from '../models/models';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  public _serviceSubscription: Observable<WhatsappMessage[]> | undefined;
  selectedYear: number | undefined;
  selectedMonth: number | undefined;

  constructor(private messageService: MessageService,
    private favouritesService: FavouritesService,
    private messageParsingService: MessageParsingService) {}

  ngOnInit(): void {
    const map = this.messageParsingService.getDatesMap().entries().next().value;
    const firstDate = new Date(map[0], map[1][0]-1);
    this._serviceSubscription = this.messageService.$getFilteredMessages(firstDate);
    this._serviceSubscription.subscribe();
  }

  public updateDateFilter(event: Date){
    console.log("emitted ", event);
    this._serviceSubscription = this.messageService.$getFilteredMessages(event);
  }

  public toggleFavourite(eventMessage: Message){
    var id = eventMessage.id!;
    if(this.favouritesService.isFavourite(id)){
      this.favouritesService.removeFromFavourites(id);
    }
    else{
      this.favouritesService.addToFavourites(eventMessage);
    }
  }
}
