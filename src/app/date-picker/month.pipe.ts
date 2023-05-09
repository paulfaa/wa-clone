import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'numberToMonth'
})
export class MonthPipe implements PipeTransform {
  transform(months: number[]): string[] {
    var monthStrings : string[] = [];
    months.forEach(month => {
      if (month < 1 || month > 12){
        monthStrings.push("Invalid month")
      }
      else{
        const date = new Date();
        date.setMonth(month - 1);
        monthStrings.push(date.toLocaleString('en-IE', {month: 'long'}));
      }
    });
    return monthStrings;
  }
}
