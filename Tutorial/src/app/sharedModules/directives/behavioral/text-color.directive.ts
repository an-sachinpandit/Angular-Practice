import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTextColor]'
})
export class TextColorDirective implements OnChanges {

  @Input('appTextColor') color : string = '';
  constructor( private el : ElementRef) { }

  ngOnChanges() {
    this.updateTextColor();
  
  }

  updateTextColor(){
    this.el.nativeElement.style.color = this.color;
  }

 

}
