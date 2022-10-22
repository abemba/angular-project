import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrivateFundModule } from './private-fund/private-fund.module';
import { SharedFundModule } from './shared-fund/shared-fund.module';
import {AppRoutes} from "./routes/routes";


@NgModule({
  imports: [
    DashboardModule,
    PrivateFundModule,
    SharedFundModule,
    RouterModule.forRoot(AppRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
