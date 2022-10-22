import { Component, OnInit } from '@angular/core';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';
import {Goal} from "../../utils/classes/goal";

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
  public PrivateFund: PrivateFund | null = null;
  public goal: Goal | null = null;

  constructor(private privateFundService:PrivateFundService) {
      privateFundService
      .getFundFromPath()
      .subscribe(
        fund=>{
        this.PrivateFund = fund;
        this.goal = fund.getGoal();
      })
  }

  ngOnInit(): void {
  }

}
