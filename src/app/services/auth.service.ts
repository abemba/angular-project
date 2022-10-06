import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable } from 'rxjs';
import { Endpoints } from '../utils/endpoints';
import { AuthTokenTypes } from '../utils/token-types';
import * as moment from 'moment';
// @ts-ignore
import webStorage from 'webstoragejs';
import { GrantService } from './grant.service';
import { AlgofameHttpContext } from '../utils/context';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth_token: string = '';
  protected authStore: any = webStorage({ namespace: 'algofame::auth' });

  constructor(private http: HttpClient, private grant: GrantService, private common: CommonService) {
    this.restoreAuthToken()
  }

  public isAuthenticated(): boolean {
    return this.auth_token ? true : false;
  }

  public login(email: string, password: string) {
    return this.http.post<any>(Endpoints.AUTH.LOGIN, { email, password }, {context: new HttpContext().set(AlgofameHttpContext.REFRESH,AlgofameHttpContext.REFRESH.defaultValue())})
      .pipe(
        map(data => {
          this.setAuthToken(data?.access_token)
          return true;
        })
      )
  }

  public logout() {
    this.grant.logout();
    this.authStore.clear()
    this.auth_token = '';
    this.common.clearDataOnLogout();
  }

  private setAuthToken(token: string) {
    this.auth_token = token; 
    this.authStore.setItem(AuthTokenTypes.APPLICATION_ACCESS.key,token)
  }

  private restoreAuthToken() {
    let token = this.authStore.getItem(AuthTokenTypes.APPLICATION_ACCESS.key)
    if (token) {
      this.setAuthToken(token);
    }
  }

  public getAuthToken () {
    return this.auth_token;
  }

  public updateEmail (newEmail: string) {
    return this.http.post(Endpoints.AUTH.UPDATE_EMAIL,{email: newEmail})
  }
  
  public updatePassword (data: any) {
    return this.http.post(Endpoints.AUTH.UPDATE_PASSWORD,data)
  }

}
