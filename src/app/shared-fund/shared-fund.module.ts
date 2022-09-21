import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { TransferInComponent } from './transfer-in/transfer-in.component';
import { TransferOutComponent } from './transfer-out/transfer-out.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PendingTransactionsComponent } from './pending-transactions/pending-transactions.component';
import { RecurringTransactionsComponent } from './recurring-transactions/recurring-transactions.component';
import { InviteComponent } from './invite/invite.component';
import { MembersComponent } from './members/members.component';
import { SettingsComponent } from './settings/settings.component';
import {  RouterModule, Routes } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { RequestsComponent } from './requests/requests.component';
import { ActivityComponent } from './activity/activity.component';
import { MarketComponent } from './market/market.component';
import { MatButtonModule } from '@angular/material/button';
import { NewContactComponent } from './invite/new-contact/new-contact.component';
import { ExistingContactsComponent } from './invite/existing-contacts/existing-contacts.component';
import { PendingComponent } from './members/pending/pending.component';
import { ActiveMembersComponent } from './members/active-members/active-members.component';
import { MyRequestsComponent } from './requests/my-requests/my-requests.component';
import { PeersRequestsComponent } from './requests/peers-requests/peers-requests.component';
import { RequestsHistoryComponent } from './requests/requests-history/requests-history.component';
import { PolicyPickerComponent } from './settings/policy-picker/policy-picker.component';
import { SettingsIndexComponent } from './settings/settings-index/settings-index.component';
import { EditNameComponent } from './settings/edit-name/edit-name.component';


const routes: Routes =
[
  { path:"shared-funds/:id", component:IndexComponent, 
  children:
  [
    {outlet:"shared-fund",path:'',component:TransactionComponent},
    {outlet:"shared-fund", path:"transactions", component:TransactionComponent},
    {outlet:"shared-fund", path:"transfer-out", component:TransferOutComponent},
    {outlet:"shared-fund", path:"transfer-in", component:TransferInComponent},
    {outlet:"shared-fund", path:"pending", component:PendingTransactionsComponent},
    {outlet:"shared-fund", path:"recurring", component:RecurringTransactionsComponent},
    {outlet:"shared-fund", path:"invite", component:InviteComponent},
    {outlet:"shared-fund", path:"members", component:MembersComponent},
    {outlet:"shared-fund", path:"requests", component:RequestsComponent,
    children:
    [
      {outlet:"requests",path:"",component:PeersRequestsComponent},
      {outlet:"requests",path:"requests",component:PeersRequestsComponent},
      {outlet:"requests",path:"my-requests",component:MyRequestsComponent},
      {outlet:"requests",path:"history",component:RequestsHistoryComponent},
    ]},
    {outlet:"shared-fund", path:"activity", component:ActivityComponent},
    {outlet:"shared-fund", path:"market", component:MarketComponent},
    {outlet:"shared-fund", path:"settings", component:SettingsComponent,
    children:
    [
      {outlet:"settings",path:"",component:SettingsIndexComponent},
      {outlet:"settings",path:"edit-name",component:EditNameComponent},
      {outlet:"settings",path:"edit-action",component:PolicyPickerComponent},
    ]},
  ]
  },
]

@NgModule({
  declarations: [
    IndexComponent,
    TransferInComponent,
    TransferOutComponent,
    TransactionComponent,
    PendingTransactionsComponent,
    RecurringTransactionsComponent,
    InviteComponent,
    MembersComponent,
    SettingsComponent,
    RequestsComponent,
    ActivityComponent,
    MarketComponent,
    NewContactComponent,
    ExistingContactsComponent,
    PendingComponent,
    ActiveMembersComponent,
    MyRequestsComponent,
    PeersRequestsComponent,
    RequestsHistoryComponent,
    PolicyPickerComponent,
    SettingsIndexComponent,
    EditNameComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonComponentsModule,
    MatButtonModule
  ],
  exports:[
    IndexComponent
  ]
})
export class SharedFundModule { }
