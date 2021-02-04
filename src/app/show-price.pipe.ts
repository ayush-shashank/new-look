import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showPrice',
})
export class ShowPricePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return value.toFixed(2);
  }
}
