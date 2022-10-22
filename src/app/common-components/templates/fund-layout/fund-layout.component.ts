import { Component, Input, OnInit } from '@angular/core';
import { FundMenuItem } from 'src/app/utils/fund-menu-item';
import {Fund} from "../../../utils/classes/fund";

@Component({
  selector: 'app-fund-layout',
  templateUrl: './fund-layout.component.html',
  styleUrls: ['./fund-layout.component.scss']
})
export class FundLayoutComponent implements OnInit {

  @Input() fund: Fund | null  =null;
  @Input() menu:FundMenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
