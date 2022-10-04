import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';
import { FundGoal } from 'src/app/utils/fund-goal';
import { GoalType } from 'src/app/utils/goal-type';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  public current_balance = 0;

  public show_feedback = false;

  public fund!:PrivateFund

  public state:string = ''

  constructor(privateFundService:PrivateFundService, private common:CommonService) {
    privateFundService.getFundFromPath().subscribe((fund)=>{
      this.current_balance = fund.getBalance()
      this.fund = fund;
    })
  }

  public goal: FundGoal = {type:GoalType.BALANCE,target:''}

  ngOnInit(): void {
  }

  public isNotNumber(){
    if(!this.goal.target){
      return true;
    }
    let amount = Number(this.goal.target);
    return isNaN(amount);
  }

  public showConfirm(){
    console.log(this.current_balance)
    console.log(this.goal.target)
    if(this.current_balance>this.goal.target){
      this.show_feedback=true;
    }else{
      this.state="confirm"
    }
  }

  public confirm(){
      this.fund.setGoal(this.goal).subscribe((data)=>{
        this.common.reloadPage()
      })
  }

  public hideFeedback(){
    this.show_feedback=false
  }

}
