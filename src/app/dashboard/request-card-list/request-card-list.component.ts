import { Component, OnInit } from '@angular/core';
import { SharedFundService } from 'src/app/services/shared-fund.service';

@Component({
  selector: 'app-request-card-list',
  templateUrl: './request-card-list.component.html',
  styleUrls: ['./request-card-list.component.scss']
})
export class RequestCardListComponent implements OnInit {

  public completed: any[] = [];
  public pending: any[] = [];
  public incomplete: any[] = [];

  constructor(private sharedFundService: SharedFundService) {
    
  }

  ngOnInit(): void {
  }

}
