import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Abilities } from '../utils/abilities';
import { AuthTokenTypes } from '../utils/token-types';
import { AuthService } from './auth.service';
import { Endpoints } from '../utils/endpoints';
// @ts-ignore
import webStorage from 'webstoragejs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrantService {
  private prompt: boolean = false;
  private status: GrantStatus | null = null;
  private requestedToken: string | null = null;
  private promptCallback: Observable<any> | null = null;
  protected authStore: any = webStorage({ namespace: 'algofame::grants' });
  
  constructor (private http: HttpClient) {}
  
  isPromptActive (): boolean {
    return this.prompt;
  }

  logout () {
    this.authStore.clear();
  }

  clearTokenForGrant (ability: Abilities) {
    const tokenName = this.getTokenNameWithAbility(ability)
    if(tokenName){
      this.authStore.removeItem(tokenName)
    }
  }

  /**
   * Attempts to grant a given ability
   * @param request 
   */
  grant ( ability: Abilities ): Observable<string> {
    return new Observable(observer => {
      const tokenName = this.getTokenNameWithAbility(ability);
      if(!tokenName){
        observer.error("No token matching the given ability.")
      }else{
        const authToken = this.getToken(tokenName);
        if(!authToken){
          this.prompt = true;
          this.status = GrantStatus.PROCESSING;
          this.requestedToken = tokenName;
          this.promptCallback = new Observable( ob => {
            switch (this.status) {
              case GrantStatus.APPROVED:
                const authToken = this.getToken(tokenName);
                observer.next(authToken.access_token)
                observer.complete()
                ob.complete()
                break;
              case GrantStatus.CANCELLED:
              case GrantStatus.ERROR:
              default:
                observer.error(new GrantCancelledException())
                break;
            }
          } )
        }else{
          observer.next(authToken.access_token);
          observer.complete();
        }
      }
    })
  }

  /**
   * Finds a token name that matches a given ability
   * @param ability 
   * @returns 
   */
  private getTokenNameWithAbility ( ability: Abilities ) : string {
    let token = '';
    Object.entries(AuthTokenTypes).forEach(
      ([tokenName, object ]) => {
        if(object.abilities.includes(ability)){
          token = object.key;
        }
      }
    )

    return token;
  }

  /**
   * Gets a token saved with the specified name
   * @param name 
   * @returns 
   */
  private getToken (name: string): any {
    // TODO: Handle expired token
    return this.authStore.getItem(name)
  }
  
  private setToken (name:string, data: any){
    return this.authStore.setItem(name,data)
  }

  private fetchToken (name: string, password: string) {
    return this.http.post(Endpoints.AUTH.GRANTS, {grant: name, password: password})
  }

  /**
   * Prompt for password and attempt to authenticate
   * @returns 
   */
  public grantAttempt (password: string): Observable<any> {
    return this.http.post(Endpoints.AUTH.GRANTS, {password: password, grant: this.requestedToken}).pipe(
      tap(
        data => {
          this.prompt = false;
          this.status = GrantStatus.APPROVED;
          if(this.requestedToken){
            this.setToken(this.requestedToken,data);
          }

          this.promptCallback?.subscribe()
        }
      )
    )
  }

  /**
   *  Cancels the grant process
   */
  cancelGrantAttempt () {
    this.prompt = false;
    this.status = GrantStatus.CANCELLED;
    this.promptCallback?.subscribe();
  }

}

enum GrantStatus {
  PROCESSING = 0,
  APPROVED,
  CANCELLED,
  ERROR
}

export class GrantCancelledException extends Error {

}