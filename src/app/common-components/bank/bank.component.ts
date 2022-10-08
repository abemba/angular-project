import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  public bank_list: any[] = []
  public state:String = "nobank"
  public fund: any = {}
  public selected_bank: any = {}
  public transfer_source = "bank"
  public transfer_destination = "bank"
  public transfer_amount = "100"
  public transfer_fee = "0.89"
  public total_charge = 100.89
  public recurring = true;
  public recurring_frequency = "daily";
  public recurring_start = new Date();

  constructor () { 
  }

  ngOnInit(): void {
  }

  updateState(state:String){
      this.state = state
  }

}
