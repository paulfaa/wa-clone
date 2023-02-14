import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {

  @Input() timestampInput!: Date;
  @Input() fromMeInput!: boolean;
  @Input() textInput!: string;

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
      localStorage.removeItem(this.timestamp.toString());
    }
    else{
      this.isFavourite = true;
      localStorage.setItem(this.timestamp.toString(), this.text);
    }
  }
}