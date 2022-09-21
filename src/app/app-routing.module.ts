import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrivateFundModule } from './private-fund/private-fund.module';
import { SharedFundModule } from './shared-fund/shared-fund.module';


const routes: Routes = 
[
  { path:"", redirectTo:"dashboard", pathMatch:"full" },
];

@NgModule({
  imports: [
    DashboardModule,
    PrivateFundModule,
    SharedFundModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
