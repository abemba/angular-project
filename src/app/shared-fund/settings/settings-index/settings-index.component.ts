import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-index',
  templateUrl: './settings-index.component.html',
  styleUrls: ['./settings-index.component.scss']
})
export class SettingsIndexComponent implements OnInit {

  name_link = [{outlets:{'settings':['edit-name']}}];
  transfer_link = [{outlets:{'settings':['edit-action']}}];

  constructor() { }

  ngOnInit(): void {
  }

}
