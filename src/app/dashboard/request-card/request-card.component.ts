import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {

  @Input() items: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
