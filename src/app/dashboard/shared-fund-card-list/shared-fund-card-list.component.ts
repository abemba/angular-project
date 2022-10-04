import { Component, OnInit } from '@angular/core';
import { SharedFund, SharedFundService } from 'src/app/services/shared-fund.service';

@Component({
  selector: 'app-shared-fund-card-list',
  templateUrl: './shared-fund-card-list.component.html',
  styleUrls: ['./shared-fund-card-list.component.scss']
})
export class SharedFundCardListComponent implements OnInit {

  public funds: SharedFund[] = [];
  constructor(private sharedFundService: SharedFundService) {
    sharedFundService
    .getList()
    .subscribe(
      (list)=> {
        this.funds = list
      })
  }


  ngOnInit(): void {
  }

}
