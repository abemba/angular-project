import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Links } from '../utils/links';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private init_data: any=null;
  private init_data_loaded=false;
  private data_relaoding=false;
  private show_loading_overlay = false;
  constructor(private http: HttpClient, private router:Router) {
    this.loadData()
  }

  private commonObserver = new Observable((observer)=>{
    let check = ()=>{
      if(!this.init_data_loaded){
        setTimeout(check,100)
      }else{
        observer.next(this.init_data)
        observer.complete()
      }  
    }

    check()
  })

  private loadData(){
    this.http.get<any>(Links.COMMON_DATA).subscribe(data=>{this.init_data=data; this.init_data_loaded=true; this.data_relaoding=false;})
  }

  public reloadCommonData(){
    this.data_relaoding = true;
    this.loadData();
  }

  public  getInitData(): Observable<any> {
    return this.commonObserver;
  }

  public isLoadingInitData(){
    return this.data_relaoding || !this.init_data_loaded;
  }

  public canShowLoadingOverlay(): boolean{
    return this.show_loading_overlay;
  }
  public turnOnLoadingOverlay(){
    this.show_loading_overlay=true;
  }
  public turnOffLoadingOverlay(){
    setTimeout(()=>this.show_loading_overlay=false)
  }
  public reloadPage(){
    window.location.reload()
  }

  public getCards():Observable<any>{
    return new Observable((observer)=>{
      this.getInitData().subscribe(data=>{
        observer.next(data.fund_pipes?.card_pipe)
        observer.complete()
      })
    });
  }

  public getCard(card_token:string):Observable<any>{
    return new Observable((observer)=>{
      this.getCards().subscribe(cards=>{
        observer.next(cards[card_token])
        observer.complete()
      })
    });
  }

  public getEmtDomain(){
    return "emt@algofame.com";
  }
}
