import { Component, OnInit } from '@angular/core';
import { filter, flatMap, map, Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { FavouritesService } from '../services/favourites.service';
import { MessageParsingService } from '../services/message-parsing.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  public _serviceSubscription: Observable<Message[]> | undefined;
  selectedYear: number | undefined;
  selectedMonth: number | undefined;

  constructor(private messageService: MessageService, private favouritesService: FavouritesService, private messageParsingService: MessageParsingService) {
    var map = messageParsingService.getDatesMap().entries().next().value;
    const firstDate = new Date(map[0], map[1][0]-1);
    this._serviceSubscription = this.messageService.$getFilteredMessages(firstDate);
    this._serviceSubscription.subscribe();
  }

  ngOnInit(): void {}

  public updateDateFilter(event: Date){
    console.log("emitted ", event);
    this._serviceSubscription = this.messageService.$getFilteredMessages(event);
    //this._serviceSubscription.subscribe();
    //need to kill old subscription
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
