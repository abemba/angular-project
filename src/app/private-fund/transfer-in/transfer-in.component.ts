import { Component, OnInit } from '@angular/core';
import { PrivateFundItem, PrivateFundService } from 'src/app/services/private-fund.service';

@Component({
  selector: 'app-transfer-in',
  templateUrl: './transfer-in.component.html',
  styleUrls: ['./transfer-in.component.scss']
})
export class TransferInComponent implements OnInit {
  public fund!: PrivateFundItem
  constructor( privateFundService: PrivateFundService) {
    privateFundService.getFundFromPath().subscribe(data=>{
      this.fund = data
    })
  }

  ngOnInit(): void {
  }

}
