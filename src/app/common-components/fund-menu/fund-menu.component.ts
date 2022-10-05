import { Component, Input, OnInit } from '@angular/core';
import { Fund } from 'src/app/services/fund.service';
import { FundMenuItem } from 'src/app/utils/fund-menu-item';

@Component({
  selector: 'app-fund-menu',
  templateUrl: './fund-menu.component.html',
  styleUrls: ['./fund-menu.component.scss']
})
export class FundMenuComponent implements OnInit {

  @Input() fund: Fund | null = null;
  @Input() menu:FundMenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
