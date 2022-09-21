import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PrivateFundService } from 'src/app/services/private-fund.service';
import { BankTransferState } from 'src/app/utils/bank-transfer-state';
import { BankTransferType } from 'src/app/utils/bank-transfer-type';
import { bankTransferSource, bankTransferState, bankTransferTarget, padZeros, daysToString } from 'src/app/utils/functions';

@Component({
  selector: 'app-recurring-transactions',
  templateUrl: './recurring-transactions.component.html',
  styleUrls: ['./recurring-transactions.component.scss']
})
export class RecurringTransactionsComponent implements OnInit {

  public transactions_card: any[] = []
  cards:any={}

  public transactions_emt: any[] = []

  public transactions_bank: any[] = []
  public recurring_items: any = {}

  constructor( privateFundService:PrivateFundService, common:CommonService) {
    privateFundService.getFundFromPath().subscribe(fund=>{
      this.recurring_items = fund.getRecurringTransactions();
    })
    common.getCards().subscribe((cards)=>{this.cards=cards;})
  }

  ngOnInit(): void {
  }

  bankTransferTargetName(type:BankTransferType,is_source:boolean): string{
    if(is_source){
      return bankTransferSource(type)
    }else{
      return bankTransferTarget(type)
    }
  }

  bTransferState(state:BankTransferState){
    return bankTransferState(state);
  }

  pad(id:string){
    return padZeros(id);
  }

  date(unix_timestamp:number){
    return unix_timestamp ? new Date(unix_timestamp*1000): new Date();
  }

  intToDays(int:number){
    return daysToString(int)
  }

  getBrand(token:string){
    return this.cards[token]?.brand;
  }

  getLast4(token:string){
    return this.cards[token]?.last_4;
  }

}
