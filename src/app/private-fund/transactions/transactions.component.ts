import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/services/fund.service';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';
import { padZeros, transactionDescription } from 'src/app/utils/functions';
import { TransactionType } from 'src/app/utils/transaction-type';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  state: String = ""

  public selectedTransactionDetails: Observable<any> | null = null;
  
  public transactions: Transaction[] = []
  public selected_transaction!: Transaction;
  public transfer_in_link = [{outlets:{"private-fund":["transfer-in"]}}]

  constructor(privateFundService:PrivateFundService, private http: HttpClient) {
    privateFundService.getFundFromPath().subscribe((fund)=>{
      this.transactions = fund.getTransactions()
    }) ;
  }

  ngOnInit(): void {
  }

  onClickUpdateState(state:String){
    this.state = state
  }

  onClickShowItem(selected:Transaction){
    this.selectedTransactionDetails = selected.fetchFormattedDetails() 
    this.selected_transaction = selected;
    this.onClickUpdateState('transactiondetail')
  }

}
