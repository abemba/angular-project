import { Component, OnInit } from '@angular/core';
import { GrantService } from 'src/app/services/grant.service';

@Component({
  selector: 'app-grant',
  templateUrl: './grant.component.html',
  styleUrls: ['./grant.component.scss']
})
export class GrantComponent implements OnInit {

  password!: string;
  loading: boolean = false;
  feedback: string | null = null;

  constructor(private grantService: GrantService) { }

  ngOnInit(): void {
  }

  grant() {
    this.loading = true;
    this.grantService.grantAttempt(this.password).subscribe(
      {
        next: data => {
          this.loading = false;
        },
        error: error => {
          this.loading = false;
          this.feedback = "The password you entered is invalid."
        }
      }
    )
  }

  clearFeedback(){
    this.feedback = '';
  }

  cancel (){
    this.grantService.cancelGrantAttempt()
  }

}
