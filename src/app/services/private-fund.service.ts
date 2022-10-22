import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { DefinedHttpContexts} from '../utils/context';
import { FundGoal } from '../utils/fund-goal';
import { FundService } from './fund.service';
import {Fund} from "../utils/classes/fund";
import {getEndpoint} from "../utils/endpoints";
import {Figure} from "../utils/classes/figure";
import * as moment from 'moment';
import {Goal} from "../utils/classes/goal";

@Injectable({
  providedIn: 'root'
})
export class PrivateFundService extends FundService {


  /**
   * Returns a list of private funds that belongs to the curren user
   * @returns
   */
  override getList(): Observable<PrivateFund[]>{
    return new Observable((observer)=>{
      super.getList().subscribe(fund_list=>{
        const filtered_list = fund_list.filter(fund => fund.isPrivate() )
        observer.next( filtered_list.map(fund => (new PrivateFund(this.http, fund.getData())) ))
      })
    });
  }


  getById(privateFundID:any): Observable<PrivateFund>{
    return new Observable((observer)=>{
      this.getList().subscribe(
        fund_list => {
          observer.next( fund_list.find( item => item.is(privateFundID) ) )
        })
    });
  }

  override getFundFromPath(): Observable<PrivateFund>{
    return new Observable(observer => {
      super
      .getFundFromPath('private-fund')
      .subscribe(
        fund => {
          observer.next((new PrivateFund(this.http, fund.getData())))
        }
      )
    })
  }
}


/**
 *
 */
export class PrivateFund extends Fund {

  public hasActiveGoal(): boolean{
      const goal = this.getGoal();
      if(goal instanceof Goal){
          if(!goal.isAchieved()){
              return true;
          }
      }
    return false;
  }

  public getGoalType(): string {
    return this.fundData?.lock_mechanism
  }


  public getGoal (): Goal | null {
      if(this.fundData.goal){
        return new Goal(this.fundData.goal);
      }else{
          return null;
      }
  }

  public setTimeGoal(time: moment.Moment){
      return this.http.post(getEndpoint("funds.private.set_time_goal", {id: this.getId()}), { target_time: time.format("YYYY-MM-DD")}, {context: new DefinedHttpContexts().refresh().grant()})
  };

  public setBalanceGoal(amount: Figure){
      return this.http.post(getEndpoint("funds.private.set_balance_goal", {id: this.getId()}), { target_balance: amount.inCents() }, {context: new DefinedHttpContexts().refresh().grant()})
  }

}
