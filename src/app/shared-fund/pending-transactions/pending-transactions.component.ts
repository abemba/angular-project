import {Component, OnInit} from '@angular/core';
import {PendingBankTransfer} from "../../utils/classes/pending-bank-transfer";
import {PendingEmtTransfer} from "../../utils/classes/pending-emt-transfer";
import {SharedFundService} from "../../services/shared-fund.service";

@Component({
    selector: 'app-pending-transactions',
    templateUrl: './pending-transactions.component.html',
    styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {

    pendingBankTransfers: PendingBankTransfer[] = [];
    pendingOutgoingEmtTransfers: PendingEmtTransfer[] = [];
    pendingIncomingEmtTransfers: PendingEmtTransfer[] = [];

    constructor(sharedService: SharedFundService) {
        sharedService.getFundFromPath().subscribe(fund => {
            this.pendingBankTransfers = fund.getPendingBankTransfers()
        })
    }

    ngOnInit(): void {
    }

}
