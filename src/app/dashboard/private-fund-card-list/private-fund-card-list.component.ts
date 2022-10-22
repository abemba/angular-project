import { Component, OnInit } from '@angular/core';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';

@Component({
  selector: 'app-private-fund-card-list',
  templateUrl: './private-fund-card-list.component.html',
  styleUrls: ['./private-fund-card-list.component.scss']
})
export class PrivateFundCardListComponent implements OnInit {

  public funds: PrivateFund[] = [];
  constructor(private privateFundService: PrivateFundService) {
    this.setFunds()
  }

  ngOnInit(): void {
  }

  setFunds(){
    this.privateFundService
    .getList()
    .subscribe((list) => {
      this.funds = list.filter( item => !item.isArchived())
    })
  }

  pushItemToFund(item:any){
    this.funds.push(item)
  }

}
