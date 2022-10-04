import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { FundGoal } from '../utils/fund-goal';
import { Links } from '../utils/links';
import { CommonService } from './common.service';
import { Fund, FundService } from './fund.service';

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
        observer.complete()
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
          observer.complete();
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
    return this.fundData?.locked
  }

  public getGoalType(): string {
    return this.fundData?.lock_mechanism
  }

  public getGoalStatement(): string{
    return ''
  }

  public getGoalTarget(): string | number {
    if(this.fundData?.lock_mechanism=="BALANCE"){
      return this.fundData?.latest_lock?.condition_value/100
    }
    return this.fundData?.latest_lock?.condition_value
  }

  public setGoal(goal:FundGoal): Observable<any>{
    return this.http
    .post<any>(Links.SET_GOAL.replace(":id",this.fundID.toString()),goal);
  }

  public updateFundName(newName:string){
    return this.http.patch(Links.PRIVATE_FUND_URL.replace(":id",this.fundID.toString()),{"nickname":newName})
    .pipe(map((data)=>{ 
      this.fundData.nickname=newName; return data;
    }))
  }
}