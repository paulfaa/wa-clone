import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MessageParsingService } from '../services/message-parsing.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Output() dateSelectEvent: EventEmitter<Date> = new EventEmitter();

  datesMap : Map<number, number[]>;
  selectedYear?: number;
  selectedMonth?: number

  constructor(private messageParsingService: MessageParsingService) {
    this.datesMap = new Map<number, number[]>;
    //this.datesMap = messageParsingService.datesMap;
    //this.datesMap.set(2011, [1,2,4,6])
    //this.datesMap.set(2015, [11,12])
    //this.datesMap.set(2016, [5,8,9])
   }

  ngOnInit(): void {
    var [firstKey] = this.datesMap.keys();
    this.selectedYear = firstKey;
    if(this.datesMap.has(firstKey)){
      this.selectedMonth = this.datesMap.get(firstKey)![0];
    }
  }

  public onYearSelected(tabChangeEvent: MatTabChangeEvent){
    this.selectedYear = Number(tabChangeEvent.tab.textLabel);
    this.selectedMonth = this.datesMap.get(this.selectedYear)![0] - 1;
    this.dateSelectEvent.emit(new Date(this.selectedYear, this.selectedMonth));
    console.log(tabChangeEvent.tab.textLabel);
  }

  public onMonthSelected(tabChangeEvent: MatTabChangeEvent){
    this.selectedMonth = new Date(Date.parse(tabChangeEvent.tab.textLabel +" 1, 2000")).getMonth();
    this.dateSelectEvent.emit(new Date(this.selectedYear!, this.selectedMonth));
  }
}
