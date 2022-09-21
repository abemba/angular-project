import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Fund } from 'src/app/utils/fund';
import { SubViewDirective } from '../sub-view.directive';
import { InPipeBankComponent } from './in-pipe-bank/in-pipe-bank.component';
import { InPipeCardComponent } from './in-pipe-card/in-pipe-card.component';
import { InPipeEmtComponent } from './in-pipe-emt/in-pipe-emt.component';

@Component({
  selector: 'app-pipe-in-common',
  templateUrl: './pipe-in-common.component.html',
  styleUrls: ['./pipe-in-common.component.scss']
})
export class PipeInCommonComponent implements OnInit {
  //@ViewChild(SubViewDirective,{static:true}) subView!: SubViewDirective
  
  @Input() fund: Fund | null = null
  
  public active: String = "e-Transfer"
  
  public menu: any[] = 
  [
    {label:"e-Transfer", elem: InPipeEmtComponent, icon:"mdi-email-outline"},
    {label:"Card", elem: InPipeCardComponent, icon:"mdi-credit-card-chip-outline"},
    {label:"Bank", elem: InPipeBankComponent, icon:"mdi-bank-outline"},
  ]
  
  
  
  
  constructor() { }
  
  ngOnInit(): void {
    //let sub = this.subView.viewContainerRef.createComponent<any>(InPipeEmtComponent)
  }
  
  setState(state:string){
    this.active = state
  }
  
  /**
   * 
   * @param new_state 
   * @param elem 
   onClickUpdateState(new_state:String, elem:Type<any>){
     this.active = new_state
     this.subView.viewContainerRef.clear()
     this.subView.viewContainerRef.createComponent<any>(elem)
    }
    */

}
