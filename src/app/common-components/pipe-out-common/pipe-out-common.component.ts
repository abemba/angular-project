import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { SubViewDirective } from '../sub-view.directive';
import { OutPipeBankComponent } from './out-pipe-bank/out-pipe-bank.component';
import { OutPipeEmtComponent } from './out-pipe-emt/out-pipe-emt.component';
import { OutPipeLocalComponent } from './out-pipe-local/out-pipe-local.component';

@Component({
  selector: 'app-pipe-out-common',
  templateUrl: './pipe-out-common.component.html',
  styleUrls: ['./pipe-out-common.component.scss']
})
export class PipeOutCommonComponent implements OnInit {

  @ViewChild(SubViewDirective,{static:true})
  subview!: SubViewDirective;

  public menu: any[] = 
  [
    {label:"e-Transfer", component: OutPipeEmtComponent, icon:"mdi-email-outline"},
    {label:"Bank", component: OutPipeBankComponent, icon:"mdi-bank-outline"},
    {label:"Local", component: OutPipeLocalComponent, icon:"mdi-account-network-outline"},
  ]

  state:String = ""

  constructor() { }

  ngOnInit(): void {
    this.state = "e-Transfer"
    this.subview.viewContainerRef.createComponent<any>(OutPipeEmtComponent)
  }

  public onClickUpdateState(newState:String,component: Type<any>){
    this.state = newState;
    this.subview.viewContainerRef.clear();
    this.subview.viewContainerRef.createComponent<any>(component)
  }

}
