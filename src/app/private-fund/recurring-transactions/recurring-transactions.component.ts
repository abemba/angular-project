import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PrivateFundService } from 'src/app/services/private-fund.service';
import { BankTransferState } from 'src/app/utils/bank-transfer-state';
import { BankTransferType } from 'src/app/utils/bank-transfer-type';
import { bankTransferSource, bankTransferState, bankTransferTarget, padZeros, daysToString } from 'src/app/utils/functions';
import {RecurringBankTransfer} from "../../utils/classes/recurring-bank-transfer";
import {RecurringEmtTransfer} from "../../utils/classes/recurring-emt-transfer";
import {RecurringCardTransfer} from "../../utils/classes/recurring-card-transfer";

@Component({
  selector: 'app-recurring-transactions',
  templateUrl: './recurring-transactions.component.html',
  styleUrls: ['./recurring-transactions.component.scss']
})
export class RecurringTransactionsComponent implements OnInit {

  cards:any={}

  public transactions_emt: RecurringEmtTransfer[] = []

  public cardTransfers: RecurringCardTransfer[] = []
  public bankTransfers: RecurringBankTransfer[] = []
  public recurring_items: any = {}

  constructor( privateFundService:PrivateFundService) {
      privateFundService.getFundFromPath().subscribe(
          fund => {
              this.bankTransfers = fund.getRecurringBankTransfers();
              this.cardTransfers = fund.getRecurringCardTransfers();
          }
      )
  }

  ngOnInit(): void {
  }


}
