import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public menu: any[] =
  [
    {label:"Dashboard", link:"dashboard", option:{exact:true}, icon:"mdi-view-dashboard-outline"},
    //{label:"Private Funds", link:"/private-funds",  option:{exact:false}, icon:"mdi-sofa-single-outline"},
    //{label:"Shared Funds", link:"/shared-funds",  option:{exact:false}, icon:"mdi-sofa-outline"},
    {label:"Private Funds", link:"/private-funds",  option:{exact:false}, icon:"mdi-account-outline"},
    {label:"Shared Funds", link:"/shared-funds",  option:{exact:false}, icon:"mdi-account-group-outline"},
    {label:"Categories/Labels", link:"/fund-categories",  option:{exact:false}, icon:"mdi-dots-triangle"},
    {label:"My Account", link:"/my-account",  option:{exact:false}, icon:"mdi-account-cog-outline"},
  ]

  constructor (public auth: AuthService) {}
}
