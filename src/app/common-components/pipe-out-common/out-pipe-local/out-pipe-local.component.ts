import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-out-pipe-local',
  templateUrl: './out-pipe-local.component.html',
  styleUrls: ['./out-pipe-local.component.scss']
})
export class OutPipeLocalComponent implements OnInit {

  public accounts: any[] =
  [
    {balance:1000, label:"Investment Fund", account_number:"123456789"},
    {balance:107000, label:"Support Fund", account_number:"123456789"},
  ]

  state: String = "transfer"
  constructor() { }

  ngOnInit(): void {
  }

  onClickUpdateState(state:String){
    this.state = state
  }

}
