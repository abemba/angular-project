import { Component, OnInit } from '@angular/core';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { PeersRequestsComponent } from './peers-requests/peers-requests.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {


  public menu:any[] =
  [
    {label:"All Requests", link:[{outlets:{"requests":["requests"]}}]},
    {label:"My Requests", link:[{outlets:{"requests":["my-requests"]}}]},
    {label:"History", link:[{outlets:{"requests":["history"]}}]},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
