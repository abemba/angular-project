import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalCardListComponent } from '../dashboard/proposal-card-list/proposal-card-list.component';
import { ProposalCardComponent } from '../dashboard/proposal-card/proposal-card.component';
import { RequestCardListComponent } from '../dashboard/request-card-list/request-card-list.component';
import { RequestCardComponent } from '../dashboard/request-card/request-card.component';
import { PrivateFundCardComponent } from '../dashboard/private-fund-card/private-fund-card.component';
import { PrivateFundCardListComponent } from '../dashboard/private-fund-card-list/private-fund-card-list.component';
import { SharedFundCardListComponent } from '../dashboard/shared-fund-card-list/shared-fund-card-list.component';
import { SharedFundCardComponent } from '../dashboard/shared-fund-card/shared-fund-card.component';
import { IndexComponent } from '../dashboard/index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { VerifyComponent } from './my-account/verify/verify.component';
import { AuthComponent } from './my-account/auth/auth.component';
import { ProfileComponent } from './my-account/profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { PasswordComponent } from './my-account/password/password.component';
import { FundCategoryComponent } from './fund-category/fund-category.component';
import { FundArchiveComponent } from './my-account/fund-archive/fund-archive.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { FormsModule } from '@angular/forms';
import { CreateFundComponent } from './create-fund/create-fund.component';
import { MyContactsComponent } from './my-contacts/my-contacts.component';

@NgModule({
  declarations: [
    ProposalCardListComponent,
    ProposalCardComponent,
    RequestCardListComponent,
    RequestCardComponent,
    PrivateFundCardComponent,
    PrivateFundCardListComponent,
    SharedFundCardListComponent,
    SharedFundCardComponent,
    IndexComponent,
    MyAccountComponent,
    VerifyComponent,
    AuthComponent,
    ProfileComponent,
    PasswordComponent,
    FundCategoryComponent,
    FundArchiveComponent,
    CreateFundComponent,
    MyContactsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    CommonComponentsModule,
    FormsModule
  ],
  exports: [
    IndexComponent,
    RequestCardListComponent,
    ProposalCardListComponent,
    SharedFundCardComponent,
    PrivateFundCardListComponent
  ]
})
export class DashboardModule { }
