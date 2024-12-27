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

  protected yearMonthMap : Map<number, Set<number>>;
  private selectedYear?: number;
  private selectedMonth?: number

  constructor(private messageParsingService: MessageParsingService) {
    this.yearMonthMap = this.messageParsingService.getYearMonthMap();
   }

  ngOnInit(): void {
    const [firstKey] = this.yearMonthMap.keys();
    this.selectedYear = firstKey;
    this.selectedMonth = this.getFirstMonth(this.selectedYear);
    //this.mapCreatedEvent.emit(new Date(this.selectedYear, this.selectedMonth!));
  }

  public onYearSelected(tabChangeEvent: MatTabChangeEvent){
    this.selectedYear = Number(tabChangeEvent.tab.textLabel);
    this.selectedMonth = this.getFirstMonth(this.selectedYear) - 1; //months are zero index
    console.warn("Selected year tab: " + this.selectedYear)
    console.warn("First month for selected year: " + this.selectedMonth)
    //this.selectedMonth = this.yearMonthMap.get(this.selectedYear)![0] - 1;
    this.dateSelectEvent.emit(new Date(this.selectedYear, this.selectedMonth));
    console.log(tabChangeEvent.tab.textLabel);
  }

  public onMonthSelected(tabChangeEvent: MatTabChangeEvent){
    this.selectedMonth = new Date(Date.parse(tabChangeEvent.tab.textLabel +" 1, 2000")).getMonth();
    this.dateSelectEvent.emit(new Date(this.selectedYear!, this.selectedMonth));
    console.log(tabChangeEvent.tab.textLabel);
  }

  private getFirstMonth(year: number): number{
    const monthSet = this.yearMonthMap.get(year)!;
    const monthArray = Array.from(monthSet);
    return Math.min(...monthArray);
  }
}
