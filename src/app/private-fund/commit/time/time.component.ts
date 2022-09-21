import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { PrivateFundItem, PrivateFundService } from 'src/app/services/private-fund.service';
import { GoalType } from 'src/app/utils/goal-type';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  public min_date = moment();
  public max_date = moment().add(60,'years');

  public selected_date:  any;

  public state: string =""

  public dateClass: MatCalendarCellClassFunction<moment.Moment> = (cell,view)=>{
    
    return '';
  }
  
  
  private fund!: PrivateFundItem
  
  constructor(private privateFund:PrivateFundService, private common:CommonService) {
    this.privateFund.getFundFromPath().subscribe(fund=>{this.fund=fund})
  }

  ngOnInit(): void {
  }

  showConfirm(){
    this.state="confirm"
  }

  confirm(){
    this.common.turnOnLoadingOverlay()
    this.fund.setGoal({type:GoalType.TIME, target:this.selected_date.format("MMM D, YYYY")}).subscribe(()=>{
      this.common.reloadPage()
    })
  }

}
