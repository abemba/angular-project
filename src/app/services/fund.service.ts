import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { Abilities } from '../utils/abilities';
import { Endpoints } from '../utils/endpoints';
import { padZeros, sortTransaction, transactionDescription } from '../utils/functions';
import { Fund as FundInterface} from '../utils/fund';
import { TransactionType } from '../utils/transaction-type';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FundService {

  constructor(protected common: CommonService, protected http: HttpClient, protected router: Router) {}

  /**
   * Gets list of funds
   * @returns 
   */
  getList(): Observable<Fund[]>{
    return new Observable((observer)=>{
      this.common.loadSetupData().subscribe((data)=>{
        observer.next(data.funds?.map((fundData: any) => (new Fund(this.http, fundData))))
        observer.complete()
      })
    });
  }

  /**
   * Returns funds as an array
   * @returns 
   */
  getListArray(): Observable<any[]>{
    return this.getList().pipe(
      map((val,index)=>{return Object.values(val)})
    );
  }

  /**
   * Gets a fund matching given id
   * @param fundID 
   * @returns 
   */
  getFundById(fundID:number): Observable<Fund>{
    return new Observable((observer)=>{
      this.getList().subscribe(list =>{
        observer.next(list.find( item => item.is(fundID) ))
        observer.complete() 
      })
    });
  }


  /**
   * Uses url matching to find fund id from given path
   * @returns 
   */
  protected getFundFromPath(outlet: string): Observable<Fund>{
    const isTargetOutlet = (checkOutlet: string) => checkOutlet==outlet; 
    let route = this.router.routerState.root;
    while(route.firstChild){
      route = route.firstChild
      if(isTargetOutlet(route.outlet))
        break;
    }
    
    return new Observable<Fund>((observer)=>
    {
      if(isTargetOutlet(route.outlet)){
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

  /**
   * Uses url matching to find fund id from given path
   * @returns 
   */
   getFromPath(): Observable<Fund>{
    const isTargetOutlet = (checkOutlet: string) => checkOutlet=='private-fund' || checkOutlet=='shared-fund'; 
    let route = this.router.routerState.root;
    while(route.firstChild){
      route = route.firstChild
      if(isTargetOutlet(route.outlet))
        break;
    }
    
    return new Observable<Fund>((observer)=>
    {
      if(isTargetOutlet(route.outlet)){
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
 * Fund
 * Used to enclose all related functions for a given fund
 */
export class Fund implements FundInterface{

  protected fundID: number;
  protected fundData: any;
  constructor(protected http:HttpClient, protected fundUser:any){
    this.fundID = fundUser.fund.id;
    this.fundData = fundUser.fund
  }

  /**
   * Gets the domain
   * @returns 
   */
  getEmtDomain(): string {
    return this?.fundData?.emt_domain
  }

  /**
   * Gets Emt Response
   * @returns 
   */
  getEmtPipeInResponse(): string {
    return this?.fundData?.response;
  }
  
  /**
   * Gets the emt challenge
   * @returns 
   */
  getEmtPipeInChallenge(): string {
    return this?.fundData?.challenge;
  }

  /**
   * Checks if the fund is private
   * @returns 
   */
  public isPrivate(): boolean {
      return this.fundData.shared==0;
  }

  /**
   * Gets the current balance of the fund
   * @returns 
   */
  getBalance(): Figure {
    return new Figure(this?.fundData?.balance);
  }

  /**
   * Gets the id/name given to the fund
   * @returns 
   */
  getFundName(): string {
    return this?.fundData?.account_name;
  }

  /**
   * Gets the fund number
   * @returns 
   */
  getFundNumber(): string {
    return this?.fundData?.grid_account_number
  }

  /**
   * Gets all the members associated to the fund
   * @returns 
   */
  getMembers(): FundMember[] {
    return this.fundData.members.map ( (item: any) => (new FundMember(item)));
  }

  /**
   * Finds a fund user matching the given id
   * @param fund_user_id 
   * @returns 
   */
  findMember(fund_user_id: number) : FundMember | undefined {
    return this.getMembers().find( item => item.getId() == fund_user_id )
  }

  /**
   * Finds a fund user matching the given id
   * @param fund_user_id 
   * @returns 
   */
   findMemberByGridAccountUserId(grid_account_user_id: number) : FundMember | undefined {
    return this.getMembers().find( item => item.getGridId()==grid_account_user_id )
  }

  /**
   * Gets all pending transactions on the fund
   */
  getPendingTransactions(): any[] {
    return this.fundData?.pending_transactions;
  }

  /**
   * Gets list of recurring transactions
   */
  getRecurringTransactions(): any[] {
    return this.fundData?.recurring_transactions;
  }

  /**
   * Gets raw transactions data
   * @returns 
   */
  getRawTransactions(): any[] {
    return sortTransaction(this?.fundData?.transactions ?? [])
  }

  /**
   * Gets list of all transactions on this fund
   * @returns 
   */
  getTransactions () : Transaction[] {
    return this.getRawTransactions().map( (item: any) => (new Transaction(item, this.http)) )
  }

  /**
   * Gets the fund if
   * @returns 
   */
  getId () : number {
    return this.fundID;
  }

  /**
   * Raw data
   * @returns ]
   */
  getData () : any {
    return this.fundUser;
  }

  /**
   * Checks if the fund is the same id as
   * @param id 
   * @returns 
   */
  is (id: number) {
    return this.fundID == id;
  }
  
  /**
   * Transfers to  a local account
   */
  transferTo (amount:Figure, fundID: number, comment: string | null = null) {
    return this.http
    .post(
      Endpoints.FUNDS.PIPES.LOCAL
      .replace(':local',fundID.toString())
      .replace(':fund',this.getId().toString()), 
      {amount: amount.inCents(), comment:comment },
      {
        headers: { "grant": Abilities.TRANSFER_OUT.toString() }
      }
    )
  }
}

/**
 * Transaction
 */
export class Transaction {
  constructor(private data: any, private http: HttpClient) {}

  getDate () {
    return this.data.created_at;
  }

  /**
   * Gets the data
   * @returns 
   */
  getId () {
    return this.data.id;
  }

  /**
   * Gets a text representation of the channel id
   * @returns 
   */
  getDescription(){
    return transactionDescription(this.data?.channel_id);
  }

  /**
   * Get the grid account user id
   * @returns 
   */
  getGridAccountUserId () {
    return this.data.account_user_id;
  }

  /**
   * Get the Figure representing the amount in dollars and in cents
   * @returns 
   */
  getAmount (): Figure {
    return new Figure(this.data.amount);
  }

  /**
   * Get the balance representing the amount in dollars and in figures
   * @returns 
   */
  getBalance () {
    return new Figure(this.data.balance);
  }

  /**
   * Checks if the type of transaction is a withdraw
   * @returns 
   */
  isWithdraw () {
    return this.data.amount < 0;
  }
  
  /**
   * Checks if the type of transaction is a deposit
   * @returns 
   */
  isDeposit () {
    return this.data.amount > 0;
  }

  /**
   * Gets a sign representing whether a transaction is a deposit or withdraw
   * @returns 
   */
  getSign (): string {
    return this.isDeposit() ? '+ ' : '- ';
  }

  /**
   * 
   * @returns 
   */
  getTransactionNumber (): string {
    return 'TR'+padZeros(this.getId());
  }

  /**
   * 
   * @returns 
   */
  fetchDetails (): Observable<any> {
    return this.http.get<any>(Endpoints.FUNDS.TRANSACTIONS.DETAILS, 
      {
        params: { 
          "grid_channel_type": this.data.channel_id,
          "grid_channel_pri_key": this.data.channel_pri_key,
        }
      })
  }

  fetchFormattedDetails (): Observable<any[]> {
    return this.fetchDetails().pipe(
      map(
      data => {
        let rt: any[] = [];
        switch (this.data.channel_id) {
          case TransactionType.EMT_IN:
            rt.push(["From",data?.detail?.name])
            rt.push(["Reference",data?.detail?.payment_key])
            rt.push(["Received on",moment(data?.detail?.received_at).format('ll')])
            break;

          case TransactionType.EMT_OUT:
            rt.push(["Sent",moment(data?.detail?.created_at).format('ll')])
            rt.push(["Sent To",data?.detail?.name])
            rt.push(["Email",data?.detail?.receiving_email])
            rt.push(["Security Question",data?.detail?.question])
            rt.push(["Security Answer",data?.detail?.response])
            rt.push(["Message",data?.detail?.message])
            break;
            
          case TransactionType.LOCAL:
            rt.push(["Local Account #","784521"])
            break;
            
          case TransactionType.STRIPE_CARD:
          case TransactionType.STRIPE_CARD_REFUND:
            rt.push(["Card #","4504***1234"])
            rt.push(["Brand","Visa"])
            break;
          
          case TransactionType.BANK:
            rt.push(["Bank",data?.detail?.eft?.bank_name])
            rt.push(["Scheduled", moment(data?.detail?.scheduled_date).format("ll")])
            rt.push(["Processed", data?.detail?.processed_date ? moment(data?.detail?.processed_date).format("ll"):'Pending'])
            break;
        
          default:
            break;
        }
        return rt;
      }))
  }
}

/**
 * Represents an amount in cents and dollars
 */
export class Figure {
  constructor(private cents: number){}

  /**
   * Dollar value of the figure
   * @returns 
   */
  inDollars(){
    return this.cents/100;
  }

  /**
   * Dollar absolute value of the figure
   * @returns 
   */
   inDollarsAbsolute(){
    return Math.abs(this.inDollars());
  }

  /**
   * Cents value of the figure
   * @returns 
   */
  inCents(){
    return this.cents;
  }

  /**
   * Cents value of the figure
   * @returns 
   */
   inCentsAbsolute(){
    return Math.abs(this.inCents());
  }

  static fromDollars (amount: number) {
    return new Figure(Math.round(amount*100));
  }
  
  static fromCents (amount: number) {
    return new Figure(amount);
  }
  
}


class FundMember {
  constructor (private data: any){}
  
  getId() {
    return this.data.id;
  }

  getGridId () {
    return this.data.grid_account_user_id;
  }

  getFullname () {
    return this.data?.user.profile?.first_name + ' ' + this.data?.user.profile?.last_name 
  }
}