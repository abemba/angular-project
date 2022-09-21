import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrivateFundItem, PrivateFundService } from 'src/app/services/private-fund.service';
import { padZeros, transactionDescription } from 'src/app/utils/functions';
import { TransactionType } from 'src/app/utils/transaction-type';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public transactions: any[] = []

  state: String = ""
  public active_item:any = {}

  public transfer_in_link = [{outlets:{"private-fund":["transfer-in"]}}]

  constructor(privateFundService:PrivateFundService) {
    privateFundService.getFundFromPath().subscribe((fund)=>{
      this.transactions = fund.getRawTransactions()
    }) ;
  }

  ngOnInit(): void {
  }

  onClickUpdateState(state:String){
    this.state = state
  }

  onClickShowItem(item:any){
    this.active_item = item;
    this.onClickUpdateState('transactiondetail')
  }

  pad(id:string){
    return padZeros(id)
  }

  abs(number:number){
    return Math.abs(number);
  }

  description(type:TransactionType){
    return transactionDescription(type)
  }

}
