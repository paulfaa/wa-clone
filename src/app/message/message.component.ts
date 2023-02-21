import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from '../models/message';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {

  @Input() timestampInput!: Date;
  @Input() fromMeInput!: boolean;
  @Input() textInput!: string;
  @Input() favouriteInput!: boolean;

  constructor(private favouritesService: FavouritesService) {}

  id?: number;
  timestamp: Date = new Date();
  fromMe: boolean = false;
  text: string = '';
  isFavourite: boolean = false;
  
  //ngOnChanges(): void {
  ngOnChanges(changes: SimpleChanges): void {
    this.timestamp = this.timestampInput;
    this.fromMe = this.fromMeInput;
    this.text = this.textInput;
    this.isFavourite = this.isFavourite;
  }

  public toggleFavourite(){
    if (this.isFavourite == true){
      this.isFavourite = false;
      this.favouritesService.removeFromFavourites(new Message(this.timestamp, this.fromMe, this.text));
    }
    else{
      this.isFavourite = true;
      this.favouritesService.addToFavourites(new Message(this.timestamp, this.fromMe, this.text));
    }
  }
}