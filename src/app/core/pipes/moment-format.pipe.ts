import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentFormat'
})
export class MomentFormatPipe implements PipeTransform {
   transform(value: number, format: string): unknown {
      const date = moment.unix(value);
      return date.format(format);
   }
}
