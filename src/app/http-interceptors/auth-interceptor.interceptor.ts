import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GrantService } from '../services/grant.service';
import { Abilities } from '../utils/abilities';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService, private grantService: GrantService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.auth.isAuthenticated()){
      // Check for grant request
      const grant = request.headers.get('grant');
      if(grant){
        return this.attemptGrant(grant,request,next)
        .pipe(
          catchError((error, cought) => {
            if(error.status==401){
              this.grantService.clearTokenForGrant(Number.parseInt(grant))
              return cought;
            }
            throw error;
        }));
      }else{
        // Else normal auth process
        const authReq = request.clone({ setHeaders: { Authorization: 'Bearer '+this.auth.getAuthToken() } });
        return next.handle(authReq)
      }
    }
    return next.handle(request);
  }

  private attemptGrant (grant: string, request: HttpRequest<unknown> , next: HttpHandler) {
    return new Observable<HttpEvent<unknown>> ( observer => 
      {
        // Get the token
        this.grantService.grant(Number.parseInt(grant)).subscribe(
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
