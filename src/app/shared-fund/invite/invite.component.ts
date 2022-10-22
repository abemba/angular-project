import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { SubViewDirective } from 'src/app/common-components/sub-view.directive';
import { ExistingContactsComponent } from './existing-contacts/existing-contacts.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import {PendingComponent} from "./pending/pending.component";
import {RespondedComponent} from "./responded/responded.component";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  @ViewChild(SubViewDirective, {static:true})
  subView!: SubViewDirective;

  public menu: any[] =
  [
    {label:"New Contact", component: NewContactComponent},
    {label:"My Contacts", component: ExistingContactsComponent},
    {label:"Pending", component: PendingComponent},
    {label:"Responded", component: RespondedComponent},
  ]

  public active: string = ""

  constructor() { }

  ngOnInit(): void {
    this.active = "New Contact"
    this.subView.viewContainerRef.createComponent<any>(NewContactComponent)
  }

  onClickUpdateState(state:string,component:Type<any>){
    this.active = state
    this.subView.viewContainerRef.clear()
    this.subView.viewContainerRef.createComponent<any>(component)
  }

}
