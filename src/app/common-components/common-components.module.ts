import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeInCommonComponent } from './pipe-in-common/pipe-in-common.component';
import { PipeOutCommonComponent } from './pipe-out-common/pipe-out-common.component';
import { InPipeBankComponent } from './pipe-in-common/in-pipe-bank/in-pipe-bank.component';
import { InPipeCardComponent } from './pipe-in-common/in-pipe-card/in-pipe-card.component';
import { InPipeEmtComponent } from './pipe-in-common/in-pipe-emt/in-pipe-emt.component';
import { FormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { SubViewDirective } from './sub-view.directive';
import { MatButtonModule } from '@angular/material/button';
import { OutPipeBankComponent } from './pipe-out-common/out-pipe-bank/out-pipe-bank.component';
import { OutPipeLocalComponent } from './pipe-out-common/out-pipe-local/out-pipe-local.component';
import { OutPipeEmtComponent } from './pipe-out-common/out-pipe-emt/out-pipe-emt.component';
import { BankComponent } from './bank/bank.component';
import { FundMenuComponent } from './fund-menu/fund-menu.component';
import { RouterModule } from '@angular/router';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { MasterLayoutComponent } from './templates/master-layout/master-layout.component';
import { FundLayoutComponent } from './templates/fund-layout/fund-layout.component';
import { BasicLayoutComponent } from './templates/basic-layout/basic-layout.component';
import { LoadingIconDirective } from './loading-icon.directive';



@NgModule({
  declarations: [
    PipeInCommonComponent,
    PipeOutCommonComponent,
    InPipeBankComponent,
    InPipeCardComponent,
    InPipeEmtComponent,
    SubViewDirective,
    OutPipeBankComponent,
    OutPipeLocalComponent,
    OutPipeEmtComponent,
    BankComponent,
    FundMenuComponent,
    LoadingOverlayComponent,
    MasterLayoutComponent,
    FundLayoutComponent,
    BasicLayoutComponent,
    LoadingIconDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxStripeModule.forRoot("pk_test_O2qZBlZwaSiQe6CTRBvxKhQt"),
    MatButtonModule,
    RouterModule

  ],
  exports:[
    PipeInCommonComponent,
    PipeOutCommonComponent,
    FundMenuComponent,
    SubViewDirective,
    LoadingOverlayComponent,
    BasicLayoutComponent,
    FundLayoutComponent,
    LoadingIconDirective,
  ]
})
export class CommonComponentsModule { }
