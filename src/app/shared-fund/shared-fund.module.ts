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
import {  RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { RequestsComponent } from './requests/requests.component';
import { ActivityComponent } from './activity/activity.component';
import { MarketComponent } from './market/market.component';
import { MatButtonModule } from '@angular/material/button';
import { NewContactComponent } from './invite/new-contact/new-contact.component';
import { ExistingContactsComponent } from './invite/existing-contacts/existing-contacts.component';
import { PendingComponent } from './invite/pending/pending.component';
import { ActiveMembersComponent } from './members/active-members/active-members.component';
import { MyRequestsComponent } from './requests/my-requests/my-requests.component';
import { PeersRequestsComponent } from './requests/peers-requests/peers-requests.component';
import { RequestsHistoryComponent } from './requests/requests-history/requests-history.component';
import { PolicyPickerComponent } from './settings/policy-picker/policy-picker.component';
import { SettingsIndexComponent } from './settings/settings-index/settings-index.component';
import { EditNameComponent } from './settings/edit-name/edit-name.component';
import {FormsModule} from "@angular/forms";
import { RespondedComponent } from './invite/responded/responded.component';
import { ConsentComponent } from './consent/consent.component';




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
    EditNameComponent,
    RespondedComponent,
    ConsentComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        CommonComponentsModule,
        MatButtonModule,
        FormsModule
    ],
  exports:[
    IndexComponent
  ]
})
export class SharedFundModule { }
