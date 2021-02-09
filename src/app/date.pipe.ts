import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(d: Date, ...args: unknown[]): unknown {
    const date = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${date}/${month}/${year}`;
  }
}
