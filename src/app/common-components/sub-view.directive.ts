import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSubView]'
})
export class SubViewDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
