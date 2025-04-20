import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'case'
})
export class CasePipe implements PipeTransform {

  transform (value : string, type : 'upper'| 'lower' | 'title' = 'upper'): string{
      if(!value){ return '';}

     switch(type){
      case 'upper':
        return value.toUpperCase();
      case 'lower':
        return value.toLowerCase();
      case 'title':
          return value.replace(/\b\w/g, char=>char.toUpperCase());
        default :
        return value;
     }
    }



}
