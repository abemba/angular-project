import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GrantService } from '../services/grant.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService, private grantService: GrantService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.auth.isAuthenticated()){
      // Check for grant request
      const grant = request.headers.get('grant');
      if(grant){
        request.headers.delete('grant')
        return new Observable<HttpEvent<unknown>> ( observer => 
          {
            // Get the token
            this.grantService.grant(Number.parseInt(grant)).subscribe(
              grantToken => {
                console.log(grantToken)
                const authReq = request.clone({ setHeaders: { Authorization: 'Bearer ' + grantToken } });
                next.handle(authReq).subscribe(
                  {
                    next: (event) => { observer.next(event) },
                    error: err => observer.error(err),
                    complete: () => observer.complete()
                  }
                )
              }
            )
        })
      }else{
        // Else normal auth process
        const authReq = request.clone({ setHeaders: { Authorization: 'Bearer '+this.auth.getAuthToken() } });
        return next.handle(authReq)
      }
    }
    return next.handle(request);
  }
}
