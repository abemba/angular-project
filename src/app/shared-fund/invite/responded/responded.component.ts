import { Component, OnInit } from '@angular/core';
import {FundInvite} from "../../../utils/classes/fund-invite";
import {SharedFundService} from "../../../services/shared-fund.service";

@Component({
  selector: 'app-responded',
  templateUrl: './responded.component.html',
  styleUrls: ['./responded.component.scss']
})
export class RespondedComponent implements OnInit {
    respondedInvite: FundInvite[] = [];

  constructor(sharedFundService: SharedFundService) {
      sharedFundService.getFundFromPath().subscribe(fund => this.respondedInvite = fund.getInvitations().filter( item => item.getStatus() !== 'pending' ))
  }

  ngOnInit(): void {
  }

}
