import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLoadingIcon]'
})
export class LoadingIconDirective implements OnChanges {

  @Input() appLoadingIcon: boolean = false;
  private innerHTML: string = '';

  constructor(private el: ElementRef) { }

  /**
   * Checks for state
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appLoadingIcon']){
      this.updateState()
    }
  }

  /**
   * Update state of the element
   */
  updateState() {
    if(this.appLoadingIcon){
      this.innerHTML = this.el.nativeElement.innerHTML;
      this.el.nativeElement.innerHTML = '<div class="spinner-border spinner-border-sm"" role="status"><span class="visually-hidden">Loading...</span></div> Loading...';
      this.el.nativeElement.disabled = true;
    }else if(!this.appLoadingIcon){
      if(this.innerHTML){
        this.el.nativeElement.disabled = false;
        this.el.nativeElement.innerHTML = this.innerHTML;
      }
    }
  }
}
