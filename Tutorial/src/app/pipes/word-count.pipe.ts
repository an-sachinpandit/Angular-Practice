import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordCount'
})
export class WordCountPipe implements PipeTransform {
  transform(value : string) : number { 
    return value.trim().split(/\s+/).filter(word=> word.length>0).length;
  }
}
