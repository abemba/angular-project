import { Component, OnInit } from '@angular/core';
import {PrivateFund, PrivateFundService} from "../../services/private-fund.service";
import {CommonService} from "../../services/common.service";
import {FundService} from "../../services/fund.service";
import {Fund} from "../../utils/classes/fund";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public fund!: Fund | null;
    public fundName: string = '';
    isLoading: boolean = false;

    constructor(fundService: FundService, private common:CommonService) {
        fundService.getFromPath()
            .subscribe(fund=>{this.fund=fund; this.fundName=fund.getFundName()})
    }

    ngOnInit(): void {
    }



    updateName(){
        this.isLoading = true;
        this.fund?.updateName(this.fundName).subscribe( value => this.isLoading = false)
    }

}
