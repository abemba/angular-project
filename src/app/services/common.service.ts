import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../utils/endpoints';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private setupData: any = null;
  private setupDataReady: boolean = false;
  private setupDataInProgress = false;
  private lastFetchAt: number | null = null;

  private setupObserver = new Observable<any>((observer) => {
    let lastCheck: number | null = null;
    let check = () => {
      if (!this.setupDataReady) {
        return;
      }

      if (!lastCheck || this.lastFetchAt != lastCheck) {
        lastCheck = this.lastFetchAt;
        if (this.setupData) {
          observer.next(this.setupData);
        }
      }
    };

    setInterval(check, 100);
  });

  constructor(private http: HttpClient) {}

  /**
   * Fetches data for initialization
   */
  private fetchSetupData() {
    if (!this.setupDataInProgress) {
      // flags
      this.setupDataInProgress = true;

      this.http.get<any>(Endpoints.INIT.DATA).subscribe({
        next: (data) => {
          this.setupData = data;

          // reset flags
          this.lastFetchAt = Date.now();
          this.setupDataReady = true;
          this.setupDataInProgress = false;
        },
        error: () => this.setupDataInProgress = false
      });
    }
  }

  /**
   * Logs out
   */
  public clearDataOnLogout() {
    this.setupData = null;
  }

  /**
   * Provides setup data
   * @returns
   */
  public loadSetupData() {
    if (!this.setupData) {
      this.fetchSetupData();
    }

    return this.setupObserver;
  }

  /**
   *
   */
  refreshSetupData() {
    this.fetchSetupData();
  }

  /**
   * Profile Data
   * @returns
   */
  public getProfile() {
    return new Observable((observer) => {
      this.setupObserver.subscribe((data) => {
        observer.next(data.profile);
        observer.complete();
      });
    });
  }

  /**
   * Pipes
   * @returns
   */
   public getFundPipes() {
    return new Observable((observer) => {
      this.setupObserver.subscribe((data) => {
        observer.next(data.pipes);
      });
    });
  }

  /**
   * Updates profile
   * @param body
   * @returns
   */
  public updateProfile(body: any) {
    return this.http.post(Endpoints.PROFILE.UPDATE, body);
  }

  public getCards() {
    return new Observable((observer) => {
      this.setupObserver.subscribe((data) => {
        observer.next(data?.cards);
        observer.complete();
      });
    });
  }
}
