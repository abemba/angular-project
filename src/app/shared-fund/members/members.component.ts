import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { SubViewDirective } from 'src/app/common-components/sub-view.directive';
import { ActiveMembersComponent } from './active-members/active-members.component';
import { PendingComponent } from './pending/pending.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  @ViewChild(SubViewDirective,{static:true})
  subView!: SubViewDirective;

  public menu: any[] = 
  [
    {label:"Active",component:ActiveMembersComponent},
    {label:"Pending",component:PendingComponent},
  ]

  public active:string = ""

  constructor() { }

  ngOnInit(): void {
    this.active = "Active"
    this.subView.viewContainerRef.createComponent<any>(ActiveMembersComponent)
  }

  onClickUpdateState(state:string,component:Type<any>){
    this.active = state;
    this.subView.viewContainerRef.clear();
    this.subView.viewContainerRef.createComponent(component);
  }

}
