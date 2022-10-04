import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';
import { Fund } from 'src/app/utils/fund';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public fund!: PrivateFund | null
  public menu: any[] = 
  [
    {label:"Transactions", "icon":"mdi mdi-history", link:["./"], options:{exact:true} },
    {label:"Pending Transactions", "icon":"mdi mdi-timer-sand", link:[{ outlets: { 'private-fund': ['pending'] } }] },
    {label:"Recurring Transactions", "icon":"mdi mdi-repeat-variant", link:[{ outlets: { 'private-fund': ['recurring'] } }] },
    {label:"Transfer in", "icon":"mdi mdi-bank-transfer-in", link:[{ outlets: { 'private-fund': ['transfer-in'] } }] },
    {label:"Transfer out", "icon":"mdi mdi-bank-transfer-out", link:[{ outlets: { 'private-fund': ['transfer-out'] } }] },
    {label:"Goals", "icon":"mdi mdi-arrow-top-right-thin-circle-outline", link:[{ outlets: { 'private-fund': ['commit'] } }] },
    {label:"Settings", "icon":"mdi mdi-cog-outline", link:[{ outlets: { 'private-fund': ['settings'] } }] },
  ];

  constructor(private privateFundService:PrivateFundService, route:ActivatedRoute) {
    privateFundService.getFundFromPath().subscribe(fundFromPath=>this.fund=fundFromPath)
  }

  ngOnInit(): void {
  }

}
