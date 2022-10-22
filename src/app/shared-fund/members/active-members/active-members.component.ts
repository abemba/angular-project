import { Component, OnInit } from '@angular/core';
import {SharedFundService} from "../../../services/shared-fund.service";
import {FundMember} from "../../../utils/classes/fund-member";

@Component({
  selector: 'app-active-members',
  templateUrl: './active-members.component.html',
  styleUrls: ['./active-members.component.scss']
})
export class ActiveMembersComponent implements OnInit {

    public members: FundMember[] = [];
  constructor(sharedFundService: SharedFundService) {
      sharedFundService.getFundFromPath().subscribe(fund => this.members = fund.getMembers())
  }

  ngOnInit(): void {
  }

}
