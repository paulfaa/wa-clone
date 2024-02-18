import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  public selectedYear: number | undefined;
  public selectedMonth: number | undefined;
  private audio: HTMLAudioElement;

  constructor(private messageService: MessageService,
    private favouritesService: FavouritesService,
    private messageParsingService: MessageParsingService) {
    this.audio = new Audio();
  }

  ngOnInit(): void {
    const map = this.messageParsingService.getDatesMap().entries().next().value;
    const firstDate = new Date(map[0], map[1][0] - 1);
    this._serviceSubscription = this.messageService.$getFilteredMessages(firstDate);
    this._serviceSubscription.subscribe();
  }

  public playVoiceNote(pathToFile: string): void {
    //this.audio.pause(); check if needed
    this.audio.src = pathToFile;
    this.audio.load();
    this.audio.play();
  }

  public pauseVoiceNote(): void {
    this.audio.pause();
  }

  public updateDateFilter(event: Date) {
    console.log("emitted ", event);
    this._serviceSubscription = this.messageService.$getFilteredMessages(event);
  }

  public logEvent(event: any) {
    //get messageDate from event
    console.log(event);
  }

  public toggleFavourite(eventMessage: WhatsappMessage) {
    var id = eventMessage.messageId!;
    if (this.favouritesService.isFavourite(id)) {
      this.favouritesService.removeFromFavourites(id);
    }
    else {
      this.favouritesService.addToFavourites(eventMessage);
    }
  }
}
