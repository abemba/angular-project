import { Component, OnInit } from '@angular/core';
import {FundService} from "../../../services/fund.service";
import {Fund} from "../../../utils/classes/fund";

@Component({
  selector: 'app-fund-archive',
  templateUrl: './fund-archive.component.html',
  styleUrls: ['./fund-archive.component.scss']
})
export class FundArchiveComponent implements OnInit {

    archivedList: Fund[] = [];
    isLoading: boolean = false;
  constructor(fundService: FundService) {
      fundService.getList().subscribe(list => {
          this.archivedList = list.filter( item => item.isArchived())
      })
  }
  ngOnInit(): void {
  }

  restore (fund: Fund){
      this.isLoading = true;
      fund.unArchive().subscribe( () => setTimeout(() => this.isLoading = false,5000))
  }
}
