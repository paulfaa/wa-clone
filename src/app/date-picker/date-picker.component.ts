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
  //@Output() mapCreatedEvent: EventEmitter<Date> = new EventEmitter();

  protected datesMap : Map<number, number[]>;
  private selectedYear?: number;
  private selectedMonth?: number

  constructor(private messageParsingService: MessageParsingService) {
    this.datesMap = this.messageParsingService.getDatesMap();
   }

  ngOnInit(): void {
    const [firstKey] = this.datesMap.keys();
    this.selectedYear = firstKey;
    if(this.datesMap.has(firstKey)){
      this.selectedMonth = this.datesMap.get(firstKey)![0];
    }
    //this.mapCreatedEvent.emit(new Date(this.selectedYear, this.selectedMonth!));
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
    console.log(tabChangeEvent.tab.textLabel);
  }
}
