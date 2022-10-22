import {Component, OnInit} from '@angular/core';
import {SharedFund, SharedFundService} from 'src/app/services/shared-fund.service';
import {sortTransaction, transactionDescription} from 'src/app/utils/functions';
import {TransactionType} from 'src/app/utils/transaction-type';
import {Transaction} from "../../utils/classes/transaction";
import {Observable} from "rxjs";

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

    public transactions: Transaction[] = [];
    public members: any = null;
    public fund: SharedFund | null = null;
    public selectedTransaction: Transaction | null = null;
    public selectedTransactionDetails: Observable<any> | null = null;
    public transfer_in_link = [{outlets: {"shared-fund": ["transfer-in"]}}]

    constructor(privateFundService: SharedFundService) {
        privateFundService.getFundFromPath().subscribe(
            fund => {
                this.fund = fund;
                this.transactions = fund.getTransactions()
                this.members = fund.getMembers()
            }
        )
    }

    ngOnInit(): void {
    }

    getName(account_user_id: number) {
        return this?.members[account_user_id]?.user?.name
    }

    onClickShowItem(selected: Transaction) {
        this.selectedTransactionDetails = selected.fetchFormattedDetails()
        this.selectedTransaction = selected;
    }

    backFromDetail() {
        this.selectedTransaction = null;
    }

}
