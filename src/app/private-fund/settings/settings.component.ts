import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { PrivateFundItem, PrivateFundService } from 'src/app/services/private-fund.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public fund!: PrivateFundItem | null;
  public fundName: string = ''

  constructor(privateFundService: PrivateFundService, private common:CommonService) {
    privateFundService.getFundFromPath().subscribe(fund=>{this.fund=fund; this.fundName=fund.getFundName()})
  }

  ngOnInit(): void {
  }



  updateName(){
    this.common.turnOnLoadingOverlay()
    this.fund?.updateFundName(this.fundName).subscribe(d=>{
      this.common.reloadPage()
    })
  }

}
