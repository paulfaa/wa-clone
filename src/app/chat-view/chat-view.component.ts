import { Component, OnInit } from '@angular/core';
import { filter, flatMap, map, Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  public _serviceSubscription: Observable<Message[]>;
  selectedYear: number | undefined;
  selectedMonth: number | undefined;

  constructor(private messageService: MessageService, private favouritesService: FavouritesService) {
    this._serviceSubscription = this.messageService.$getAllMessages(); //should call getFilteredMessages for first month instead of getAll
    this._serviceSubscription.subscribe();
  }

  ngOnInit(): void {
    //console.log('chat view component msgs: ', this.messages);
  }

  //not used
  /* public updateSubscription(year: number): void {
    console.log("calling updateSubscription");
    this._serviceSubscription = this.messageService.$getAllMessages();
    this._serviceSubscription.pipe(
      map(messages =>
        messages.filter(msg => new Date(msg.timestamp).getFullYear() == year)
      )
    ).subscribe();
  } */

  public updateDateFilter(event: Date){
    console.log("emitted ", event);
    this._serviceSubscription = this.messageService.$getFilteredMessages(event); 
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
