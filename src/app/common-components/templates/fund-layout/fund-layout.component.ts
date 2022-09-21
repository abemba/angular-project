import { Component, Input, OnInit } from '@angular/core';
import { FundMenuItem } from 'src/app/utils/fund-menu-item';

@Component({
  selector: 'app-fund-layout',
  templateUrl: './fund-layout.component.html',
  styleUrls: ['./fund-layout.component.scss']
})
export class FundLayoutComponent implements OnInit {

  @Input() fund: any =null;
  @Input() menu:FundMenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
