import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-proposal-card',
  templateUrl: './proposal-card.component.html',
  styleUrls: ['./proposal-card.component.scss']
})
export class ProposalCardComponent implements OnInit {

  @Input() type: String =""
  @Input() fund_name: String =""
  constructor() { }

  ngOnInit(): void {
  }

}
