import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-in-pipe-emt',
  templateUrl: './in-pipe-emt.component.html',
  styleUrls: ['./in-pipe-emt.component.scss']
})
export class InPipeEmtComponent implements OnInit {

  @Input() challenge!:  String | undefined;
  @Input() response!: String | undefined
  @Input() email!: String  | undefined
  constructor() { 
  }


  ngOnInit(): void {
  }

}
