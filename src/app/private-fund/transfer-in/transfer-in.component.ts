import { Component, OnInit } from '@angular/core';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';

@Component({
  selector: 'app-transfer-in',
  templateUrl: './transfer-in.component.html',
  styleUrls: ['./transfer-in.component.scss']
})
export class TransferInComponent implements OnInit {
  public fund!: PrivateFund
  constructor( privateFundService: PrivateFundService) {
    privateFundService.getFundFromPath().subscribe(data=>{
      this.fund = data
    })
  }

  ngOnInit(): void {
  }

}
