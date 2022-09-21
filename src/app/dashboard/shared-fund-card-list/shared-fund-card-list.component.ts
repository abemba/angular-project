import { Component, OnInit } from '@angular/core';
import { SharedFundService } from 'src/app/services/shared-fund.service';

@Component({
  selector: 'app-shared-fund-card-list',
  templateUrl: './shared-fund-card-list.component.html',
  styleUrls: ['./shared-fund-card-list.component.scss']
})
export class SharedFundCardListComponent implements OnInit {

  constructor(private sharedFundService: SharedFundService) {
    sharedFundService.getList().subscribe((data)=> {this.funds = Object.values(data); console.log(data)})
  }

  public funds: any[] = [];

  ngOnInit(): void {
  }

}
