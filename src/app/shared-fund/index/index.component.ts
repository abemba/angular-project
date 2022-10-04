import { Component, OnInit } from '@angular/core';
import { SharedFund, SharedFundService } from 'src/app/services/shared-fund.service';
import { Fund } from 'src/app/utils/fund';
import { FundMenuItem } from 'src/app/utils/fund-menu-item';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  fund: SharedFund | null = null;
  menu: FundMenuItem[] = 
  [
    {label:"Transactions", "icon":"mdi mdi-history", link:['./'], options:{exact:true} },
    {label:"Transfer in", "icon":"mdi mdi-bank-transfer-in", link:[{ outlets: { 'shared-fund': ['transfer-in'] } }] },
    {label:"Transfer out", "icon":"mdi mdi-bank-transfer-out", link:[{ outlets: { 'shared-fund': ['transfer-out'] } }] },
    {label:"Pending Transactions", "icon":"mdi mdi-timer-sand", link:[{ outlets: { 'shared-fund': ['pending'] } }] },
    {label:"Recurring Transactions", "icon":"mdi mdi-repeat-variant", link:[{ outlets: { 'shared-fund': ['recurring'] } }] },
    {label:"Invite", "icon":"mdi mdi-account-multiple-plus-outline", link:[{ outlets: { 'shared-fund': ['invite'] } }] },
    {label:"Members", "icon":"mdi mdi-account-group-outline", link:[{ outlets: { 'shared-fund': ['members'] } }] },
    {label:"Requests", "icon":"mdi mdi-comment-text-multiple-outline", link:[{ outlets: { 'shared-fund': ['requests'] } }] },
    //{label:"Activity Log", "icon":"mdi mdi-clipboard-text-outline", link:[{ outlets: { 'shared-fund': ['activity'] } }] },
    
    //{label:"Integration", "icon":"mdi mdi-dots-circle", link:[{ outlets: { 'shared-fund': ['market'] } }] },
    //{label:"Apps", "icon":"mdi mdi-dots-circle", link:[{ outlets: { 'shared-fund': ['market'] } }] },
    //{label:"Market", "icon":"mdi mdi-storefront-outline", link:[{ outlets: { 'shared-fund': ['market'] } }] },
    //{label:"Trade", "icon":"mdi mdi-handshake-outline", link:[{ outlets: { 'shared-fund': ['market'] } }] },
    
    {label:"Settings", "icon":"mdi mdi-cog-outline", link:[{ outlets: { 'shared-fund': ['settings'] } }] },
  ]
  constructor(sharedFundService:SharedFundService) {
    sharedFundService.getFundFromPath().subscribe(
      fundFromPath => {
        this.fund=fundFromPath;
      })
  }

  ngOnInit(): void {
  }

}
