import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { getValidationClass } from 'src/app/utils/functions/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  message: string = ''
  showAuthErrorMsg: boolean = false;
  loading: boolean = false;


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public login () {
    this.loading = true;
    this.auth.login(this.email,this.password).subscribe(
      {
        complete: ()=> {
          this.router.navigate(['/'])
        },
        error: (error) => {
          this.showAuthErrorMsg = true;
          if(error.status==0){
            this.message = 'No internet connection. Please try again later.'
          }else{
            this.message = 'Incorrect email or password.'
          }
          this.loading = false;
        }
      })
  }

  public getValidationClass (fieldModel: any) {
    return getValidationClass(fieldModel);
  }

  public clearMsg () {
    this.showAuthErrorMsg = false;
  }

}
