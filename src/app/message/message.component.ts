import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Message } from '../models/message';

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
  
  ngOnChanges(changes: SimpleChanges): void {
    this.timestamp = this.timestampInput;
    this.fromMe = this.fromMeInput;
    this.text = this.textInput;
  }
}
