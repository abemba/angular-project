import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from '../utils/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated (): boolean {
    return false;
  }

  public login (email: string, password: string) {
    return this.http.post(Endpoints.AUTH.LOGIN, { email, password })
  }
}
