import { Component, OnInit } from '@angular/core';
import { Figure, Fund, FundService } from 'src/app/services/fund.service';
import { GrantCancelledException } from 'src/app/services/grant.service';

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

  amount: number | null = null; 
  target!: number;
  
  isLoading: boolean = false;

  constructor(private fund: FundService) {
    fund.getList().subscribe(list => this.accounts=list )
    fund.getFromPath().subscribe(fund => {this.activeAccount = fund; this.maximum=fund.getBalance().inDollars() })
  }

  ngOnInit(): void {
  }

  onClickUpdateState(state:String){
    this.state = state
  }

  getTargetDescriptor () {
    const target = this.accounts?.find(item => item.getId() == this.target)
    if(!target){
      return 'Unknown';
    }
    return target.getFundName() + ' - ' + target.getFundNumber(); 
  }

  moveMoney () {
    if(!this.amount){
      return 
    }

    this.isLoading = true;
    const amount = Figure.fromDollars(this.amount);
    this.activeAccount?.transferTo(amount, this.target).subscribe(
      {
        next: data => {
          this.isLoading=false;
          this.onClickUpdateState('transfersuccess')
          this.amount = null;
        }, 
        error: (e) => {
          if(!(e instanceof GrantCancelledException)){
            this.onClickUpdateState('transferfailed'); 
            this.amount=null
          }
          this.isLoading=false; 
        },
        complete: () => {}
      }
    )
  }

}
