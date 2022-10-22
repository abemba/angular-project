import { Injectable } from '@angular/core';
import {CommonService} from "./common.service";
import {Observable} from "rxjs";
import {Bank} from "../utils/classes/bank";
import {Card} from "../utils/classes/card";
import {HttpClient, HttpContext} from "@angular/common/http";
import {Endpoints, getEndpoint} from "../utils/endpoints";
import { DefinedHttpContexts } from "../utils/context";
import {EmtConfig} from "../utils/classes/emt-config";
import {ChargeableBase} from "../utils/classes/chargeablebase";
import {Percent} from "../utils/classes/percent";
import {Figure} from "../utils/classes/figure";

@Injectable({
  providedIn: 'root'
})
export class FundPipesService {

  constructor(private common: CommonService, private http: HttpClient) { }

  public createBank (data: any) {
    return this.http.post(Endpoints.PIPES.BANK, data, { context: new DefinedHttpContexts().refresh()} )
  }

  public createCard(data: any){
      return this.http.post(getEndpoint("pipes.cards"), data, { context: new DefinedHttpContexts().refresh() })
  }


  /**
   * Gets all the cards associated to the user account
   */
  getCards (): Observable<Card[]> {
    return new Observable( observer => {
      this.common.getFundPipes().subscribe(pipes => {
        const cards = pipes?.cards?.map( (data: any) => new Card(data, this.http));
        observer.next(cards);
      })
    } );
  }

  /**
   * Gets the card fees
   */
  getCardFees (): Observable<ChargeableBase> {
    return new Observable( observer => {
      this.common.loadSetupData().subscribe(
        {
          next: value => observer.next(new ChargeableBase(Figure.fromDollars(value.fees?.card?.base_fee), Percent.fromPercent(value.fees.card.commission)))
        })
    })
  }

    /**
     * Gets the bank fees
     */
    getBankFees (): Observable<Figure> {
        return new Observable( observer => {
            this.common.loadSetupData().subscribe(
                {
                    next: value => observer.next(Figure.fromDollars(value?.fees?.bank))
                })
        })
    }

    /**
     * Emt config
     */
    getEmtConfig (): Observable<EmtConfig> {
        return new Observable( observer => {
            this.common.loadSetupData().subscribe(
                {
                    next: value => observer.next(new EmtConfig(value?.fees?.emt))
                })
        })
    }

  /**
   * Gets all the banks associated to the user account
   */
  getBanks (): Observable<Bank[]> {
    return new Observable( observer => {
      this.common.getFundPipes().subscribe(pipes => {
        const banks = pipes?.bank?.map( (data: any) => new Bank(data, this.http));
        observer.next(banks);
      })
    } );
  }
}

