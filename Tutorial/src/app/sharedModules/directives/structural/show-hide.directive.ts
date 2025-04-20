import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appShowHide]'
})
export class ShowHideDirective {

private hasView : boolean = false;

constructor(private templateRef : TemplateRef<any>, private viewContainer : ViewContainerRef){}

@Input() set appShowHide(condition : boolean) {
  if(condition && !this.hasView) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  }else if(!condition && this.hasView) {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
}
