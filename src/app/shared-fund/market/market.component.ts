import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  public menu: any[]=
  [
    {label:"Dashboard"},
    {label:"Properties"},
    {label:"Global Money Transfer"},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
