import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'numberToMonth'
})
export class MonthPipe implements PipeTransform {
  transform(months: number[]): string[] {
    var monthStrings : string[] = [];
    months.forEach(month => {
      const date = new Date();
      date.setMonth(month - 1);
      monthStrings.push(date.toLocaleString('en-IE', {month: 'long'}));
    });
    return monthStrings;
  }
}
