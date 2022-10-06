import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, tap, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GrantService } from '../services/grant.service';
import { Abilities } from '../utils/abilities';
import { AlgofameHttpContext } from '../utils/context';
import { CommonService } from '../services/common.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService, private grantService: GrantService, private common: CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedRequest: Observable<HttpEvent<any>> = next.handle(request);
    if(this.auth.isAuthenticated()){
      /**
       * Checks for elevated access
       */
      const grant = request.context.has(AlgofameHttpContext.GRANT);
      if(grant){
        const grantValue = request.context.get(AlgofameHttpContext.GRANT);
        modifiedRequest = this.attemptGrant(grantValue,request,next)
        .pipe(
          catchError((error, cought) => {
            if(error.status==401){
              this.grantService.clearTokenForGrant(grantValue)
              return cought;
            }
            throw error;
        }));
      }else{
        /**
         * Process the request as normal access
         */
        const authReq = request.clone({ setHeaders: { Authorization: 'Bearer '+this.auth.getAuthToken() } });
        modifiedRequest = next.handle(authReq)
      }
      
      /**
       * Refresh the data after an operation is completed
       */
      if(request.context.has(AlgofameHttpContext.REFRESH)){
        modifiedRequest = modifiedRequest.pipe(
          tap((data) => {
            if(data instanceof HttpResponse){
              setInterval(() => this.common.refreshSetupData(),2000)
            }
          }))
      }
    }
    
    return modifiedRequest;
  }

  private attemptGrant (grant: Abilities, request: HttpRequest<unknown> , next: HttpHandler) {
    return new Observable<HttpEvent<unknown>> ( observer => 
      {
        // Get the token
        this.grantService.grant(grant).subscribe(
          {
            next: grantToken => {
              const authReq = request.clone({ setHeaders: { Authorization: 'Bearer ' + grantToken } });
              next.handle(authReq).subscribe(
                {
                  next: (event) => { 
                    observer.next(event) 
                  },
                  error: err => {
                    observer.error(err)
                  },
                  complete: () => observer.complete()
                }
              )
            },
            error: error => observer.error(error)
        }
        )
    })
  }
}
