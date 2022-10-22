import { Component, Input, OnInit } from '@angular/core';
import { FundMenuItem } from 'src/app/utils/fund-menu-item';
import {Fund} from "../../utils/classes/fund";

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
