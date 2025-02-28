import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberMasking'
})
export class NumberMaskingPipe implements PipeTransform {

  transform(value : string | number, maskChar = '*', visibleDigits: number = 4): string {
    if(!value) return '';

    let strValue = value.toString();
    let maskLength = strValue.length - visibleDigits;

    if(maskLength <=0) return strValue;

    let maskedPart = maskChar.repeat(maskLength);
    let visiblePart = strValue.slice(-visibleDigits);
    return maskedPart + visiblePart;
  }
}
