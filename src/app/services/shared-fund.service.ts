import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Fund } from '../utils/fund';
import { CommonService } from './common.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SharedFundService {

  constructor(private http: HttpClient, private common:CommonService, private router: Router) {
    
  }
  
  getList(): Observable<any[]>{
    return new Observable((observer)=>{
      this.common.getInitData().subscribe((data)=>{
        observer.next(data.shared_funds)
        observer.complete()
      })
    });
  }

  getListArray(): Observable<any[]>{
    return this.getList().pipe(
      map((val,index)=>{return Object.values(val)})
    );
  }

  getFundById(fundID:number): Observable<SharedFundItem>{
    return new Observable((observer)=>{
      this.getList().subscribe(data =>{
        let fund = new SharedFundItem(fundID,this.http,this.common, data[fundID]); 
        observer.next(fund)
        observer.complete() 
      })
    });
  }


  getFundFromPath(): Observable<SharedFundItem>{
    let route = this.router.routerState.root;
    while(route.firstChild){
      route = route.firstChild
      if(route.outlet=="shared-fund")
        break;
    }
    
    return new Observable<SharedFundItem>((observer)=>
    {
      if(route.outlet=="shared-fund"){
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

export class SharedFundItem implements Fund{

  constructor(private fundID:number, private http:HttpClient, private commonService: CommonService, private fundData:any){

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

  public isPrivate(): boolean {
      return false;
  }

  getBalance(): number {
    return this?.fundData?.balance/100
  }
  getFundName(): string {
    return this?.fundData?.nickname
  }
  getFundNumber(): string {
    return this?.fundData?.account_number
  }
  getMembers(): any{
    return _.mapKeys(this?.fundData?.members,(item)=>{
      return item.account_user_id;
    })
  }
  getPendingTransactions(): any[] {
    throw new Error('Method not implemented.');
  }
  getRecurringTransactions(): any[] {
    throw new Error('Method not implemented.');
  }
  getRawTransactions(): any[] {
    return this?.fundData?.raw_transactions ? Object.values(this.fundData.raw_transactions) : []
  }
  
}