import { Component, OnInit } from '@angular/core';
import { Figure, Fund, FundService } from 'src/app/services/fund.service';

@Component({
  selector: 'app-out-pipe-local',
  templateUrl: './out-pipe-local.component.html',
  styleUrls: ['./out-pipe-local.component.scss']
})
export class OutPipeLocalComponent implements OnInit {

  public accounts: Fund[] | null = null;
  public activeAccount: Fund | null = null;
  public maximum: number  = 0; 

  state: String = "transfer"

  amount!: number; 
  target!: number;
  
  isLoading: boolean = false;

  constructor(private fund: FundService) {
    fund.getList().subscribe(list => this.accounts=list )
    fund.getFromPath().subscribe(fund => {this.activeAccount = fund; this.maximum=fund.getBalance() })
  }

  ngOnInit(): void {
  }

  onClickUpdateState(state:String){
    this.state = state
  }

  moveMoney () {
    this.isLoading = true;
    const amount = Figure.fromDollars(this.amount);
    this.activeAccount?.transferTo(amount, this.target).subscribe(
      data => {
        console.log(data)
        this.isLoading=false;
        this.onClickUpdateState('transferconfirm')
      }
    )
  }

}
