import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { PrivateFund, PrivateFundService } from 'src/app/services/private-fund.service';
import {TimeComponentState} from "../../../utils/types/time-component-state";
import {GrantCancelledException} from "../../../services/grant.service";

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  public min_date = moment().add("1","day");
  public max_date = moment().add(60,'years');
  public selected_date:  moment.Moment | null = this.min_date;
  public dateClass: MatCalendarCellClassFunction<moment.Moment> = (cell,view)=> '';
  public state: TimeComponentState = "init"
  private fund!: PrivateFund;
  public isLoading: boolean = false;

  constructor(private privateFund:PrivateFundService, private common:CommonService) {
    this.privateFund.getFundFromPath().subscribe(fund=> this.fund = fund)
  }

  ngOnInit(): void {
  }

  confirm(){
      this.isLoading = true;
      if(this.selected_date){
          this.fund.setTimeGoal(this.selected_date).subscribe({
              next: () => {
                  this.isLoading = false
                  this.update('success')
              },
              error: error => {
                  this.isLoading = false
                  if(error instanceof GrantCancelledException){
                      return;
                  }
                  this.update('error')
              }
          })
      }
  }

  update(state: TimeComponentState){
      this.state = state;
  }

}
