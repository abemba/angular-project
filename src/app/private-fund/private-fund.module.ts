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
    RouterModule,
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
