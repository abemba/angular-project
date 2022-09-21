import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-existing-contacts',
  templateUrl: './existing-contacts.component.html',
  styleUrls: ['./existing-contacts.component.scss']
})
export class ExistingContactsComponent implements OnInit {

  public contacts:any[] =
  [
    {name:"Jane Doe", email:"j.doe@xyz.com"},
    {name:"John Doe", email:"john.doe@xyz.com"},
    {name:"Charlie Doe", email:"c.doe@xyz.com"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
