import { Component, OnInit } from '@angular/core';
import { PrivateFundService } from 'src/app/services/private-fund.service';
import { SharedFundService } from 'src/app/services/shared-fund.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public private_fund_total=0;
  public private_fund_count=0;
  public shared_fund_total=0;
  public shared_fund_count=0;

  constructor(private privateFundService:PrivateFundService, private sharedFundService:SharedFundService) {
    // Private Funds
    privateFundService.getList().subscribe(list=>{
      this.private_fund_count = list.length
      this.private_fund_total = list.reduce( (sum, fund) => sum + fund.getBalance(), 0)
    })

    // Shared Funds
    sharedFundService.getList().subscribe(list=>{
      this.shared_fund_count = list.length
      this.shared_fund_total = list.reduce((prev,fund) => prev+fund.getBalance(), 0)
    })
  }

  ngOnInit(): void {
  }

}
