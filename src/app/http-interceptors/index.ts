import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorInterceptor } from "./auth-interceptor.interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
  ];
  