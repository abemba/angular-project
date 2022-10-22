import { Component, OnInit } from '@angular/core';
import {SharedFund, SharedFundService} from "../../services/shared-fund.service";

@Component({
  selector: 'app-transfer-in',
  templateUrl: './transfer-in.component.html',
  styleUrls: ['./transfer-in.component.scss']
})
export class TransferInComponent implements OnInit {

    fund: SharedFund | null = null;

  constructor(fundService: SharedFundService) {
      fundService.getFundFromPath().subscribe(value => {
          this.fund = value
      })
  }

  ngOnInit(): void {
  }

}
