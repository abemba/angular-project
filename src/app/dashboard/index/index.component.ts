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
    privateFundService.getListArray().subscribe(data=>{
      this.private_fund_count = data.length
      data.forEach(val=>{ this.private_fund_total=this.private_fund_total+val.balance })
    })

    // Shared Funds
    sharedFundService.getListArray().subscribe(data=>{
      this.shared_fund_count = data.length
      data.forEach(val=>{ this.shared_fund_total=this.shared_fund_total+val.balance })
    })
  }

  ngOnInit(): void {
  }

}
