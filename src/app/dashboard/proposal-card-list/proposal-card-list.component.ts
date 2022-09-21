import { Component, OnInit } from '@angular/core';
import { SharedFundService } from 'src/app/services/shared-fund.service';

@Component({
  selector: 'app-proposal-card-list',
  templateUrl: './proposal-card-list.component.html',
  styleUrls: ['./proposal-card-list.component.scss']
})
export class ProposalCardListComponent implements OnInit {

  public pending: any[] = [];
  public history: any[] = [];

  constructor(private shareFundService: SharedFundService) {
    
  }



  ngOnInit(): void {
  }

}
