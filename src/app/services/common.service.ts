import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Endpoints } from '../utils/endpoints';
import { Links } from '../utils/links';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  
  private setupData: any = null;
  private setupDataReady: boolean = false;
  private setupDataInProgress = false;
  private lastFetchAt : number | null = null;
  
  private setupObserver = new Observable<any>((observer)=>{
    let lastCheck: number | null = null;
    let check = ()=>{
      if(!this.setupDataReady){
        return
      }

      if(!lastCheck || this.lastFetchAt!=lastCheck){
        lastCheck = this.lastFetchAt;
        observer.next(this.setupData)
      }
    }
    
    setInterval(check,100);
  })
  
  constructor (private http: HttpClient) {}

  /**
   * Fetches data for initialization
   */
  private fetchSetupData() {
    if(!this.setupDataInProgress){
      // flags
      this.setupDataInProgress = true;
      
      this.http.get<any>(Endpoints.INIT.DATA)
      .subscribe(
        data => {
          this.setupData = data;

          // reset flags
          this.lastFetchAt = Date.now()
          this.setupDataReady = true;
          this.setupDataInProgress = false;
        })
    }
  }

  /**
   * Provides setup data
   * @returns 
   */
  public loadSetupData () {
    if(!this.setupData){
      this.fetchSetupData();
    }

    return this.setupObserver
  }

  /**
   * 
   */
  refreshSetupData(){
    this.fetchSetupData()
  }

  /**
   * Profile Data
   * @returns 
   */
  public getProfile () {
    return new Observable((observer)=>{
      this.setupObserver.subscribe(data=>{
        observer.next(data.profile)
        observer.complete()
      })
    });
  }
  

  /**
   * Updates profile
   * @param body 
   * @returns 
   */
  public updateProfile (body: any) {
    return this.http.post(Endpoints.PROFILE.UPDATE,body)
  }

  public reloadPage () {

  }

  public getCards () {
    return new Observable((observer)=>{
      this.setupObserver.subscribe(data=>{
        observer.next(data?.cards)
        observer.complete()
      })
    });
  }
}
