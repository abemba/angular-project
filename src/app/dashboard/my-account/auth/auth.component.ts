import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formReady: boolean = false;
  form: any = {};
  updating: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  validate (input1:any, input2:any)  {
    if(input1.valid && input2.valid){
        if(this.form.email1==this.form.email2){
          this.formReady = true;
          return;
        }
    }
    this.formReady = false;
  }

  update () {
    this.updating = true;
    this.auth.updateEmail(this.form.email1).subscribe(data => {
      this.updating = false;
    })
  }

}
