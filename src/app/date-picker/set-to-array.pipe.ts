import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setToArray'
})
export class SetToArrayPipe implements PipeTransform {
  transform(value: Set<number>): number[] {
    return Array.from(value).sort((a, b) => a - b);
  }
}