import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-fund-card',
  templateUrl: './shared-fund-card.component.html',
  styleUrls: ['./shared-fund-card.component.scss']
})
export class SharedFundCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() nickname: String ="";
  @Input() account_number: String ="";
  @Input() balance: String ="";
  @Input() members_count: String ="";
  @Input() policy: String ="";

  accountBalance(){
    return Number.parseFloat(this.balance.toString())/100
  }

}
