import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  date= new Date();
  form: any = {};
  formReady: boolean = false;
  updating: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  validate () {
    if(this.form.current && this.form.new && this.form.new==this.form.new_repeat){
      this.formReady = true;
    }else{
      this.formReady = false;
    }
  }

  validateRepeat () : boolean {
    if(this.form.new && this.form.new==this.form.new_repeat){
      return true;
    }else{
      return false;
    }
  }

  update () {
    this.updating = true;
    this.form.current_password = this.form.current;
    this.form.new_password = this.form.new;
    this.auth.updatePassword(this.form).subscribe(data => {
      this.updating = false;
      console.log(data)
    })
  }

}
