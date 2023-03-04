import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from '../models/message';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {

  @Input() idInput!: number;
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
    this.id = this.idInput;
    this.timestamp = this.timestampInput;
    this.fromMe = this.fromMeInput;
    this.text = this.textInput;
    this.isFavourite = this.isFavourite;
  }

  public toggleFavourite(){
    console.log("id of message clicked: ", this.id);
    if (this.isFavourite == true){
      this.isFavourite = false;
      this.favouritesService.removeFromFavourites(this.id!);
    }
    else{
      this.isFavourite = true;
      this.favouritesService.addToFavourites(this.id!, new Message(this.timestamp, this.fromMe, this.text));
    }
  }
}