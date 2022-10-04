import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit {

  public menu: any[] = 
  [
    {label:"Balance",  link:["./"], options:{exact:true} },
    {label:"Time",  link:[{ outlets: { 'commit': ['time'] } }], options:{exact:true} },
    {label:"History",  link:[{ outlets: { 'commit': ['metric'] } }], options:{exact:true} },
  ];

  public PrivateFund: PrivateFund | null = null

  constructor(private privateFundService:PrivateFundService) {
      privateFundService
      .getFundFromPath()
      .subscribe(
        fund=>{
        this.PrivateFund = fund;
      })
  }

  ngOnInit(): void {
  }

}
