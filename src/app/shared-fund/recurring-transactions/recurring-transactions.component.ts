import {Component, OnInit} from '@angular/core';
import {RecurringBankTransfer} from "../../utils/classes/recurring-bank-transfer";
import {SharedFundService} from "../../services/shared-fund.service";
import {RecurringCardTransfer} from "../../utils/classes/recurring-card-transfer";
import {RecurringEmtTransfer} from "../../utils/classes/recurring-emt-transfer";

@Component({
    selector: 'app-recurring-transactions',
    templateUrl: './recurring-transactions.component.html',
    styleUrls: ['./recurring-transactions.component.scss']
})
export class RecurringTransactionsComponent implements OnInit {

    recurringBank: RecurringBankTransfer[] = [];
    recurringCard: RecurringCardTransfer[] = [];
    recurringEmt: RecurringEmtTransfer[] = []

    constructor(sharedFundService: SharedFundService) {
        sharedFundService.getFundFromPath().subscribe(fund => {
            this.recurringBank = fund.getRecurringBankTransfers()
            this.recurringCard = fund.getRecurringCardTransfers()
        })
    }

    ngOnInit(): void {
    }

}
