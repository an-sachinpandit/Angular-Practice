import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOddEvenCounter]'
})
export class OddEvenCounterDirective {
  protected count = 0;
  protected textElemet! : HTMLParagraphElement;


  constructor(private ef : ElementRef, private renderer : Renderer2) { 
    this.textElemet = this.renderer.createElement('p');
    this.renderer.appendChild(this.ef.nativeElement, this.textElemet);
    this.updateText();
  }

  @HostListener('click') onClick(){
      this.count++;
      this.updateText();

  }

   updateText(){
    const text = this.count % 2 === 0 ? `Even: ${this.count}` : `Odd: ${this.count}`;
    this.renderer.setProperty(this.textElemet, 'textConent', text);
  }



}
