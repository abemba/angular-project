import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {map, Observable} from 'rxjs';
import {CommonService} from './common.service';
import * as _ from 'lodash';
import {FundService} from './fund.service';
import {Fund} from "../utils/classes/fund";
import {Contact} from "../utils/classes/contact";
import {getEndpoint} from "../utils/endpoints";
import {DefinedHttpContexts} from "../utils/context";
import {FundInvite} from "../utils/classes/fund-invite";

@Injectable({
    providedIn: 'root'
})
export class SharedFundService extends FundService {

    /**
     * Returns a list of shared funds that user is associated with
     * @returns
     */
    override getList(): Observable<SharedFund[]> {
        return new Observable((observer) => {
            super.getList().subscribe(fund_list => {
                const filtered_list = fund_list.filter(fund => !fund.isPrivate())
                observer.next(filtered_list.map(fund => (new SharedFund(this.http, fund.getData()))))
            })
        });
    }


    getById(privateFundID: any): Observable<SharedFund> {
        return new Observable((observer) => {
            this.getList().subscribe(
                fund_list => {
                    observer.next(fund_list.find(item => item.is(privateFundID)))
                })
        });
    }


    override getFundFromPath(): Observable<SharedFund> {
        return new Observable(observer => {
            super
                .getFundFromPath('shared-fund')
                .subscribe(
                    fund => {
                        observer.next((new SharedFund(this.http, fund.getData())))
                    }
                )
        })
    }

}

export class SharedFund extends Fund {
    getPolicy(): string {
        return this.getTransferOutPolicy();
    }

    getMemberCount(): number {
        return this.getMembers().length;
    }

    getTransferOutPolicy() {
        return this.fundData.policy.TRANSFER_OUT.policy
    }

    getInvitePolicy() {
        return this.fundData.policy.INVITE.policy
    }

    getPolicyUpdatePolicy() {
        return this.fundData.policy.UPDATE_POLICY.policy
    }

    invite(contact: Contact, message: string = '') {
        return this.http.post(getEndpoint("requests.invite", {
            fund: this.getId(),
            message
        }), {contact: contact.getId()}, {context: new DefinedHttpContexts().refresh().grant()})
    }

    getInvitations(): FundInvite[] {
        return this.fundData?.invitations?.map((item: any) => new FundInvite(item)) ?? []
    }

    updateRequestPolicy (request_type: string, new_policy: string) {
        return this.http.post(getEndpoint("requests.update_policy", {fund: this.getId()}), {request_type, new_policy}, {context: new DefinedHttpContexts().refresh().grant()})
    }
}
