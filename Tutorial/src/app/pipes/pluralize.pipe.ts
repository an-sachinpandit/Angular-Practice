import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {
transform(value: number, singular : string, plural : string) : string {
  if(!value)
  {
    return '';
  }
  if(value===0 || value===1){
    return `${value} ${singular}`;
  }
  return `${value} ${plural}`; 
}
 
}
