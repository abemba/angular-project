import { Component, Input, OnInit } from '@angular/core';
import { InPipeBankComponent } from './in-pipe-bank/in-pipe-bank.component';
import { InPipeCardComponent } from './in-pipe-card/in-pipe-card.component';
import { InPipeEmtComponent } from './in-pipe-emt/in-pipe-emt.component';
import {Fund} from "../../utils/classes/fund";

@Component({
  selector: 'app-pipe-in-common',
  templateUrl: './pipe-in-common.component.html',
  styleUrls: ['./pipe-in-common.component.scss']
})
export class PipeInCommonComponent implements OnInit {

  @Input() fund: Fund | null = null

  public active: "e-Transfer" | "Card" | "Bank" = "e-Transfer"

  public menu: any[] =
  [
    {label:"e-Transfer", elem: InPipeEmtComponent, icon:"mdi-email-outline"},
    {label:"Card", elem: InPipeCardComponent, icon:"mdi-credit-card-chip-outline"},
    {label:"Bank", elem: InPipeBankComponent, icon:"mdi-bank-outline"},
  ]




  constructor() { }

  ngOnInit(): void {
  }

  setState(state: "e-Transfer" | "Card" | "Bank"){
    this.active = state
  }

}
