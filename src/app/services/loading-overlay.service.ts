import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingOverlayService {

  private show_loading_overlay = false;

  constructor() { }

  public canShowLoadingOverlay(): boolean{
    return this.show_loading_overlay;
  }
  public turnOnLoadingOverlay(){
    this.show_loading_overlay=true;
  }
  public turnOffLoadingOverlay(){
    setTimeout(()=>this.show_loading_overlay=false)
  }
}
