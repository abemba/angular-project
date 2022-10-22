import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';
import {Figure} from "../../../utils/classes/figure";
import {BalanceComponentState} from "../../../utils/types/balance-component-state";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  public currentBalance: Figure  = Figure.fromDollars(0);
  public fund!:PrivateFund
  public amount: number | null  = null;
  public state: BalanceComponentState = 'init';
  public isLoading: boolean = false;


  constructor(privateFundService:PrivateFundService, private common:CommonService) {
    privateFundService.getFundFromPath().subscribe((fund)=>{
      this.currentBalance = fund.getBalance()
      this.fund = fund;
    })
  }

  ngOnInit(): void {
  }

  public update(state: BalanceComponentState){
      this.state = state;
  }

  public confirm(){
      this.isLoading = true;
      if(this.amount){
        this.fund.setBalanceGoal(Figure.fromDollars(this.amount)).subscribe(
            {
                next: () => {
                    this.state = 'success';
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false;
                    this.state = 'error'
                }
            })
      }
  }
}
