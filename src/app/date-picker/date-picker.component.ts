import { Component, OnInit } from '@angular/core';
import { MessageParsingService } from '../services/message-parsing.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  datesMap : Map<number, number[]>;

  constructor(private messageParsingService: MessageParsingService) {
    this.datesMap = new Map<number, number[]>;
    this.datesMap.set(2011, [1,2,4,6])
    this.datesMap.set(2015, [11,12])
    this.datesMap.set(2016, [5,8,9])
   }

  ngOnInit(): void {
    //this.datesMap = this.messageParsingService.datesMap;
  }
}
