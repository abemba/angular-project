import { Component, Input, OnInit } from '@angular/core';
import { LockType } from 'src/app/utils/lock-type';

@Component({
  selector: 'app-private-fund-card',
  templateUrl: './private-fund-card.component.html',
  styleUrls: ['./private-fund-card.component.scss']
})
export class PrivateFundCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() nickname: String ="";
  @Input() account_number: String ="";
  @Input() balance: String ="";
  @Input() lock_type: LockType = LockType.BALANCE;
  @Input() is_locked: Boolean =false;
  @Input() target: string ="";

  isTimeLock(){
    if(this.lock_type=="TIME"){
      return true;
    }
    return false;
  }

  lockBalance(){
    return Number.parseFloat(this.target)/100
  }

  accountBalance(){
    return Number.parseFloat(this.balance.toString())
  }

}
