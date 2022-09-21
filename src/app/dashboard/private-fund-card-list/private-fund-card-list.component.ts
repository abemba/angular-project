import { Component, OnInit } from '@angular/core';
import { PrivateFundService } from 'src/app/services/private-fund.service';

@Component({
  selector: 'app-private-fund-card-list',
  templateUrl: './private-fund-card-list.component.html',
  styleUrls: ['./private-fund-card-list.component.scss']
})
export class PrivateFundCardListComponent implements OnInit {

  public funds: any[] = [];
  constructor(private privateFundService: PrivateFundService) {
    this.setFunds()
  }
  
  ngOnInit(): void {
  }
  
  setFunds(){
    this.privateFundService.getList().subscribe((data) => {
      this.funds = Object.values(data)
    })
  }

  pushItemToFund(item:any){
    this.funds.push(item)
  }

}
