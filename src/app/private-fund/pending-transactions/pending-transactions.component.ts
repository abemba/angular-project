import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrivateFundService } from 'src/app/services/private-fund.service';
import { BankTransferState } from 'src/app/utils/bank-transfer-state';
import { BankTransferType } from 'src/app/utils/bank-transfer-type';
import { bankTransferSource, bankTransferState, bankTransferTarget, padZeros } from 'src/app/utils/functions';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {
  public pending: any = {}

  constructor(privateFundService:PrivateFundService) {
    privateFundService.getFundFromPath().subscribe(fund=>{
      this.pending = fund.getPendingTransactions()
    })
  }

  ngOnInit(): void {
  }

  pad(id:string){
    return padZeros(id)
  }

  bankTransferDirection(type:BankTransferType,is_source:boolean){
    if(is_source){
      return bankTransferSource(type);
    }else{
      return bankTransferTarget(type);
    }
  }

  bTransferState(state:BankTransferState){
    return bankTransferState(state)
  }

}
