import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  public menu: any[] = 
  [
    {label:"Profile", link:'/my-account', options:{exact:true}, icon:"mdi-card-account-details-outline"},
    //{label:"verify", link:[{outlets:{"myaccount":['verify']}}], options:{exact:true}, icon:"mdi-check-circle-outline"},
    {label:"Email", link:[{outlets:{"myaccount":['email']}}], options:{exact:true}, icon:"mdi-email-outline"},
    {label:"Password", link:[{outlets:{"myaccount":['password']}}], options:{exact:true}, icon:"mdi-form-textbox-password"},
    //{label:"Archives", link:[{outlets:{"myaccount":['archives']}}], options:{exact:true}, icon:"mdi-archive-outline"},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
