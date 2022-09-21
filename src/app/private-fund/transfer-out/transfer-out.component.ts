import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-out',
  templateUrl: './transfer-out.component.html',
  styleUrls: ['./transfer-out.component.scss']
})
export class TransferOutComponent implements OnInit {

  public menu: any[] = 
  [
    {label:"e-Transfer", link:[{ outlets: { 'transfer-out': ['emt'] } }]},
    {label:"Bank", link:[{ outlets: { 'transfer-out': ['bank'] } }]},
    {label:"Local", link:[{ outlets: { 'transfer-out': ['local'] } }]},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
