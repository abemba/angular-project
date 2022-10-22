import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { FundService } from 'src/app/services/fund.service';
import { GrantCancelledException } from 'src/app/services/grant.service';
import {Fund} from "../../../utils/classes/fund";
import {Figure} from "../../../utils/classes/figure";
import {OutPipeLocalStates} from "../../../utils/types/out-pipe-local-states";

@Component({
  selector: 'app-out-pipe-local',
  templateUrl: './out-pipe-local.component.html',
  styleUrls: ['./out-pipe-local.component.scss']
})
export class OutPipeLocalComponent implements OnInit {

  public accounts: Fund[] | null = null;
  public activeAccount: Fund | null = null;
  public maximum: number  = 0;

  state: OutPipeLocalStates = "transfer"

  amount: number | null = null;
  target: Fund | null = null;
  isLoading: boolean = false;

  constructor(private fundService: FundService, private common: CommonService) {
      fundService.getList().subscribe(list => {
        this.accounts = list.filter( item => !item.isArchived() )
        if(this.accounts.length==1){
            this.onClickUpdateState('methodnotavailable')
        }
    } )
      fundService.getFromPath().subscribe(fund => {this.activeAccount = fund; this.maximum=fund.getBalance().inDollars() })
  }

  ngOnInit(): void {
  }

  onClickUpdateState(state:OutPipeLocalStates){
    this.state = state
  }

  getTargetDescriptor () {
    const target = this.accounts?.find(item => this.target ? item.getId() == this.target?.getId() : false)
    if(!target){
      return 'Unknown';
    }
    return target.getFundName() + ' - ' + target.getFundNumber();
  }


  moveMoney () {
    if(!this.amount || !this.target){
      return
    }

    this.isLoading = true;
    const amount = Figure.fromDollars(this.amount);

    this.activeAccount?.transferTo(amount, this.target).subscribe(
      {
        next: data => {
          this.isLoading=false;
          this.amount = null;
          if(data.request_number){
              if(!data.approved){
                  this.onClickUpdateState('transferpendingapproval')
                  return;
              }
          }
          this.onClickUpdateState('transfersuccess')
        },
        error: (e) => {
          if(!(e instanceof GrantCancelledException)){
            this.onClickUpdateState('transferfailed');
            this.amount=null
          }
          this.isLoading=false;
        },
        complete: () => {}
      })

  }

}
