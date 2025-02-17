import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({
  name: 'limitedChar'

})
export class LimitedCharPipe implements PipeTransform {

  transform (value : string, limit : number) : any {
    return value.substring(0,limit);
  }
}
