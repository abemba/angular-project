import { Component, OnInit } from '@angular/core';
import { SharedFundService } from 'src/app/services/shared-fund.service';
import { sortTransaction, transactionDescription } from 'src/app/utils/functions';
import { TransactionType } from 'src/app/utils/transaction-type';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  public transactions: any[] =[];
  public members: any = null
  constructor(privateFundService:SharedFundService) {
    privateFundService.getFundFromPath().subscribe(
      fund=>{
        this.transactions = fund.getRawTransactions()
        this.members = fund.getMembers() 
      }
    )
  }

  ngOnInit(): void {
  }

  getName(account_user_id:number){
    return this?.members[account_user_id]?.user?.name
  }

  getTransactions(){
    return sortTransaction(this.transactions);
  }

  getDescription(type:TransactionType){
    return transactionDescription(type)
  }
}