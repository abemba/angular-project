import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Fund } from '../utils/fund';
import { FundGoal } from '../utils/fund-goal';
import { Links } from '../utils/links';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateFundService {



  constructor(private http: HttpClient, private common:CommonService, private router:Router) {

  }

  getList(): Observable<any[]>{
    return new Observable((observer)=>{
      this.common.getInitData().subscribe(data=>{
        observer.next(data.private_funds)
        observer.complete()
      })
    });
  }

  getListArray(): Observable<any[]>{
    return this.getList().pipe(
      map((val,index)=>{return Object.values(val)})
    );
  }

  
  getById(privateFundID:any): Observable<any>{
    return new Observable((observer)=>{
      this.getList().subscribe(data =>{ observer.next( data[privateFundID] ) })
    });
  }

  getFundById(privateFundID:number): Observable<PrivateFundItem>{
    return new Observable((observer)=>{
      this.getList().subscribe(data =>{
        let fund = new PrivateFundItem(privateFundID,this.http,this.common, data[privateFundID]); 
        observer.next(fund)
        observer.complete() 
      })
    });
  }

  getFundFromPath(): Observable<PrivateFundItem>{
    let route = this.router.routerState.root;
    while(route.firstChild){
      route = route.firstChild
      if(route.outlet=="private-fund")
        break;
    }
    
    return new Observable<PrivateFundItem>((observer)=>
    {
      if(route.outlet=="private-fund"){
        route.parent?.params.subscribe(params=>{
          this.getFundById(params['id']).subscribe(fund=>{
            observer.next(fund)
            observer.complete()
          })
        })
      }else{
        observer.next(undefined)
        observer.complete()
      }
    })
  }


}


/**
 * 
 */
export class PrivateFundItem implements Fund {
  constructor(private fundID: number,private http: HttpClient, private common:CommonService, private fundData: any) {
  }
  isPrivate(): boolean {
    return true;
  }

  getEmtDomain(): string {
    return this?.fundData?.emt_domain
  }

  getEmtPipeInResponse(): string {
    return this?.fundData?.response;
  }
  
  getEmtPipeInChallenge(): string {
    return this?.fundData?.challenge;
  }

  public getRawTransactions(): any[]{
    if(this.fundData?.raw_transactions){
      return Object.values(this.fundData?.raw_transactions).reverse()
    }else{
      return [];
    }
  }

  public getPendingTransactions(){
    return this.fundData?.pending_transactions;
  }
  
  public getRecurringTransactions(){
    return this.fundData?.recurring_transactions;
  }

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

  public getBalance(){
    return this.fundData.balance
  }

  public getFundNumber(){
    return this.fundData?.account_number;
  }
  
  public getFundName(){
    return this.fundData?.nickname;
  }

  public setGoal(goal:FundGoal): Observable<any>{
    this.common.turnOnLoadingOverlay()
    return this.http
    .post<any>(Links.SET_GOAL.replace(":id",this.fundID.toString()),goal);
  }

  public updateFundName(newName:string){
    return this.http.patch(Links.PRIVATE_FUND_URL.replace(":id",this.fundID.toString()),{"nickname":newName})
    .pipe(map((data)=>{ 
      this.fundData.nickname=newName; return data;
    }))
  }

  public getData(){
    return this.fundData;
  }
}