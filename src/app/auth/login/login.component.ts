import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public login () {
    this.auth.login(this.email,this.password).subscribe(data => {
      console.log(data)
    })
  }

}
