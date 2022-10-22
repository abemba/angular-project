import {Component, OnInit} from '@angular/core';
import {Contact} from "../../../utils/classes/contact";
import {SharedFundService} from "../../../services/shared-fund.service";
import {FundInvite} from "../../../utils/classes/fund-invite";

@Component({
    selector: 'app-pending',
    templateUrl: './pending.component.html',
    styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

    pendingInvites: FundInvite[] = [];

    constructor(fundService: SharedFundService) {
        fundService.getFundFromPath().subscribe(fund => {
            this.pendingInvites  = fund.getInvitations().filter( value => value.getStatus()==='pending');
        })
    }

    ngOnInit(): void {
    }

}
