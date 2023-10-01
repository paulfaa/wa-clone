import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {

  @Input() idInput!: number;
  @Input() timestampInput!: Date;
  @Input() fromMeInput!: boolean;
  @Input() textInput: string | undefined;
  @Input() favouriteInput!: boolean;
  @Input() filenameInput: string | undefined;

  @Output() toggleFavouriteEvent: EventEmitter<Message> = new EventEmitter();

  constructor() {}
  id?: number;
  timestamp: Date = new Date();
  fromMe: boolean = false;
  text: string = '';
  filename?: string;
  isFavourite: boolean = false;
  
  //ngOnChanges(): void {
  ngOnChanges(changes: SimpleChanges): void {
    this.id = this.idInput;
    this.timestamp = this.timestampInput;
    this.fromMe = this.fromMeInput;
    if(this.textInput){
      this.text = this.textInput;
    }
    if(this.filenameInput){
      console.log("filename set")
      this.filename = this.filenameInput;
    }
    this.isFavourite = this.favouriteInput;
  }

  public toggleFavourite(){
    console.log("id of message clicked: ", this.id);
    if (this.isFavourite == true){
      this.isFavourite = false;
    }
    else{
      this.isFavourite = true;
    }
    this.toggleFavouriteEvent.emit(new Message(this.timestamp, this.fromMe, this.text, this.id));
  }
}