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
import {MatDatepickerModule} from "@angular/material/datepicker";
import {STRIPE_PUBLIC_KEY} from "../utils/constants/stripe-config";
import { MethodNotAvailableComponent } from './method-not-available/method-not-available.component';
import { ErrorComponent } from './error/error.component';
import { ResponseMessageComponent } from './response-message/response-message.component';
import { CreateContactComponent } from './create-contact/create-contact.component';



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
    LoadingIconDirective,
    MethodNotAvailableComponent,
    ErrorComponent,
    ResponseMessageComponent,
    CreateContactComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        NgxStripeModule.forRoot(STRIPE_PUBLIC_KEY),
        MatButtonModule,
        RouterModule,
        MatDatepickerModule

    ],
    exports: [
        PipeInCommonComponent,
        PipeOutCommonComponent,
        FundMenuComponent,
        SubViewDirective,
        LoadingOverlayComponent,
        BasicLayoutComponent,
        FundLayoutComponent,
        LoadingIconDirective,
        MethodNotAvailableComponent,
        ErrorComponent,
        ResponseMessageComponent,
        CreateContactComponent
    ]
})
export class CommonComponentsModule { }
