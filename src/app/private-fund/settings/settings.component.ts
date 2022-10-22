import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public fund!: PrivateFund | null;
  public fundName: string = '';
  isLoading: boolean = false;

  constructor(privateFundService: PrivateFundService, private router:Router) {
    privateFundService.getFundFromPath()
        .subscribe(fund=>{this.fund=fund; this.fundName=fund.getFundName()})
  }

  ngOnInit(): void {
  }



  updateName(){
      this.isLoading = true;
    this.fund?.updateName(this.fundName).subscribe( value => this.isLoading = false)
  }

  archive(){
      this.isLoading = true;
      this.fund?.archive().subscribe(result => {
          const away = () => {
            this.isLoading = false;
            this.router.navigate(["my-account", {outlets:{"myaccount":['archives']}}])
          }
          setTimeout(away,4000)
      })
  }
}
