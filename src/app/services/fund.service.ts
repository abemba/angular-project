import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {map, Observable} from 'rxjs';
import {Endpoints, getEndpoint} from '../utils/endpoints';
import {padZeros, transactionDescription} from '../utils/functions';
import {TransactionType} from '../utils/transaction-type';
import {CommonService} from './common.service';
import {Fund} from "../utils/classes/fund";
import {Figure} from "../utils/classes/figure";
import {DefinedHttpContexts} from "../utils/context";

@Injectable({
    providedIn: 'root'
})
export class FundService {

    constructor(protected common: CommonService, protected http: HttpClient, protected router: Router) {
    }

    /**
     * Creates a fund
     * @param data
     */
    create(data: any) {
        return this.http.post(getEndpoint("funds.create"), data, {context: new DefinedHttpContexts().refresh()})
    }

    /**
     * Gets list of funds
     * @returns
     */
    getList(): Observable<Fund[]> {
        return new Observable((observer) => {
            this.common.loadSetupData().subscribe((data) => {
                observer.next(data.funds?.map((fundData: any) => (new Fund(this.http, fundData))))
            })
        });
    }

    /**
     * Returns funds as an array
     * @returns
     */
    getListArray(): Observable<any[]> {
        return this.getList().pipe(
            map((val, index) => {
                return Object.values(val)
            })
        );
    }

    /**
     * Gets a fund matching given id
     * @param fundID
     * @returns
     */
    getFundById(fundID: number): Observable<Fund> {
        return new Observable((observer) => {
            this.getList().subscribe(list => {
                let target = list.find(item => item.is(fundID))
                observer.next(target)
                //observer.complete()
            })
        });
    }


    /**
     * Uses url matching to find fund id from given path
     * @returns
     */
    protected getFundFromPath(outlet: string): Observable<Fund> {
        const isTargetOutlet = (checkOutlet: string) => checkOutlet == outlet;
        let route = this.router.routerState.root;
        while (route.firstChild) {
            route = route.firstChild
            if (isTargetOutlet(route.outlet))
                break;
        }

        return new Observable<Fund>((observer) => {
            if (isTargetOutlet(route.outlet)) {
                route.parent?.params.subscribe(params => {
                    this.getFundById(params['id']).subscribe(fund => {
                        observer.next(fund)
                        //observer.complete()
                    })
                })
            } else {
                observer.next(undefined)
                observer.complete()
            }
        })
    }

    /**
     * Uses url matching to find fund from given path
     * @returns
     */
    getFromPath(): Observable<Fund> {
        const isTargetOutlet = (checkOutlet: string) => checkOutlet == 'private-fund' || checkOutlet == 'shared-fund';
        let route = this.router.routerState.root;
        while (route.firstChild) {
            route = route.firstChild
            if (isTargetOutlet(route.outlet))
                break;
        }

        return new Observable<Fund>((observer) => {
            if (isTargetOutlet(route.outlet)) {
                route.parent?.params.subscribe(params => {
                    this.getFundById(params['id']).subscribe(fund => {
                        observer.next(fund)
                        //observer.complete()
                    })
                })
            } else {
                observer.next(undefined)
                observer.complete()
            }
        })
    }

    /**
     * Uses url matching to find fund id from given path
     * @returns
     */
    getFundIdViaPath(): Observable<number> {
        const isTargetOutlet = (checkOutlet: string) => checkOutlet == 'private-fund' || checkOutlet == 'shared-fund';
        let route = this.router.routerState.root;
        while (route.firstChild) {
            route = route.firstChild
            if (isTargetOutlet(route.outlet))
                break;
        }

        return new Observable<number>((observer) => {
            if (isTargetOutlet(route.outlet)) {
                route.parent?.params.subscribe(params => {
                    observer.next(params['id'])
                })
            } else {
                observer.next(undefined)
                observer.complete()
            }
        })
    }


}
