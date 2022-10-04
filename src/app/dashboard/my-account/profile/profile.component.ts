import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public data: any = {};
  public loading: boolean = false;

  constructor(private common: CommonService) {
    common.getProfile().subscribe(
      data => this.data = data
    )
  }

  ngOnInit(): void {
  }

  update () {
    if(this.data instanceof Object){
      const entries = Object.entries(this.data)
      const filtered = entries.filter(([key, val]) => val !== null )
      const filteredObject = Object.fromEntries(filtered)
      this.loading = true;
      this.common.updateProfile(filteredObject)
      .subscribe(
        ret => {
          this.loading = false;
        })
    }
  }
}
