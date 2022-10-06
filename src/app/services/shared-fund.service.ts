import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CommonService } from './common.service';
import * as _ from 'lodash';
import { Fund, FundService } from './fund.service';

@Injectable({
  providedIn: 'root'
})
export class SharedFundService extends FundService {
  
  /**
   * Returns a list of shared funds that user is associated with
   * @returns 
   */
   override getList(): Observable<SharedFund[]>{
    return new Observable((observer)=>{
      super.getList().subscribe(fund_list=>{
        const filtered_list = fund_list.filter(fund => !fund.isPrivate() )
        observer.next( filtered_list.map(fund => (new SharedFund(this.http, fund.getData())) ))
      })
    });
  }


  getById(privateFundID:any): Observable<SharedFund>{
    return new Observable((observer)=>{
      this.getList().subscribe(
        fund_list => { 
          observer.next( fund_list.find( item => item.is(privateFundID) ) )
        })
    });
  }


  override getFundFromPath(): Observable<SharedFund>{
    return new Observable(observer => {
      super
      .getFundFromPath('shared-fund')
      .subscribe( 
        fund => {
          observer.next((new SharedFund(this.http, fund.getData())))
        }
      )
    })
  }

}

export class SharedFund extends Fund{
  getPolicy (): string {
    return this.getTransferOutPolicy();
  }
  
  getMemberCount (): number {
    return this.getMembers().length;
  }

  getTransferOutPolicy () {
    return this.fundData.policy.TRANSFER_OUT.policy
  }
}