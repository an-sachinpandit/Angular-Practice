import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDisableButton]'
})
export class DisableButtonDirective {
  @Input('appDisableButton') appDisableButton : number = 5;

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick(){
    this.el.nativeElement.disabled = true;
    setTimeout(()=>{
      this.el.nativeElement.disabled = false;
    }, this.appDisableButton * 1000);
  }

}
