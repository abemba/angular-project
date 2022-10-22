import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import {FundMember} from "../../../utils/classes/fund-member";

@Component({
  selector: 'app-in-pipe-emt',
  templateUrl: './in-pipe-emt.component.html',
  styleUrls: ['./in-pipe-emt.component.scss']
})
export class InPipeEmtComponent implements OnInit {

  @Input() member!: FundMember | undefined
  constructor() {
  }


  ngOnInit(): void {
  }

}
