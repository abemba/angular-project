import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  public activity:any[] =
  [
    {date:new Date(), name:"Jane Doe", description:"Approved transfer", icon:"mdi mdi-bank"},
    {date:new Date(), name:"Roe Doe", description:"Approved transfer", icon:"mdi mdi-bank"},
    {date:new Date(), name:"Zoe Doe", description:"Approved transfer", icon:"mdi mdi-bank"},
    {date:new Date(), name:"Loe Doe", description:"Rejected transfer", icon:"mdi mdi-bank"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
