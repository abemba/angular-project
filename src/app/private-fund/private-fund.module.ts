import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransferOutComponent } from './transfer-out/transfer-out.component';
import { TransferInComponent } from './transfer-in/transfer-in.component';
import { PendingTransactionsComponent } from './pending-transactions/pending-transactions.component';
import { RecurringTransactionsComponent } from './recurring-transactions/recurring-transactions.component';
import { CommitComponent } from './commit/commit.component';
import { SettingsComponent } from './settings/settings.component';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule } from '@angular/forms';
import { BalanceComponent } from './commit/balance/balance.component';
import { TimeComponent } from './commit/time/time.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MetricComponent } from './commit/metric/metric.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const routes: Routes = 
[
  { path:"private-funds/:id", component:IndexComponent, 
  children:
    [
      {outlet:"private-fund",path:'',component:TransactionsComponent},
      {outlet:"private-fund", path:"transactions", component:TransactionsComponent},
      {outlet:"private-fund", path:"transfer-out", component:TransferOutComponent},
      {outlet:"private-fund", path:"transfer-in", component:TransferInComponent},
      {outlet:"private-fund", path:"transactions", component:TransferInComponent},
      {outlet:"private-fund", path:"pending", component:PendingTransactionsComponent},
      {outlet:"private-fund", path:"recurring", component:RecurringTransactionsComponent},
      {outlet:"private-fund", path:"commit", component:CommitComponent, 
      children:
      [
        {outlet:"commit", path:"", component:BalanceComponent},
        {outlet:"commit", path:"balance", component:BalanceComponent},
        {outlet:"commit", path:"metric", component:BalanceComponent},
        {outlet:"commit", path:"time", component:TimeComponent},
      ]},
      {outlet:"private-fund", path:"settings", component:SettingsComponent},
    ], 
  },
]

@NgModule({
  declarations: [
    TransactionsComponent,
    TransferOutComponent,
    TransferInComponent,
    PendingTransactionsComponent,
    RecurringTransactionsComponent,
    CommitComponent,
    SettingsComponent,
    IndexComponent,
    BalanceComponent,
    TimeComponent,
    MetricComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    NgxStripeModule.forRoot("pk_test_O2qZBlZwaSiQe6CTRBvxKhQt"),
    FormsModule,
    CommonComponentsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports:[
    IndexComponent
  ]
})
export class PrivateFundModule { }
