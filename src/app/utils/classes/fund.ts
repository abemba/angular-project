import {FundInterface} from "../interfaces/fund";
import {HttpClient, HttpContext} from "@angular/common/http";
import {FundMember} from "./fund-member";
import {sortTransaction} from "../functions";
import {Endpoints, getEndpoint} from "../endpoints";
import {AlgofameHttpContext, DefinedHttpContexts} from "../context";
import {Contact} from "./contact";
import {Figure} from "./figure";
import {Transaction} from "./transaction";
import {RecurringBankTransfer} from "./recurring-bank-transfer";
import {RecurringCardTransfer} from "./recurring-card-transfer";
import {Observable, tap} from "rxjs";
import {PendingBankTransfer} from "./pending-bank-transfer";
import {PendingEmtTransfer} from "./pending-emt-transfer";
import {FundRequestType} from "../types/fund-request-type";
import {FundInvite} from "./fund-invite";

/**
 * Fund
 * Used to enclose all related functions for a given fund
 */
export class Fund implements FundInterface{

    protected fundID: number;
    protected fundData: any;
    constructor(protected http:HttpClient, protected fundUser:any){
        this.fundID = fundUser.fund.id;
        this.fundData = fundUser.fund;
    }

    /**
     * Transfers a given amount to a contact
     * @param amount
     * @param contact
     * @param recurring
     * @param message
     */
    send (amount: Figure, contact: Contact , recurring: boolean = false,message: string | null = null){
        const url = getEndpoint("funds.pipes.emt",{ fund: this.getId()})
        if(this.isPrivate()){
            return this.http.post(url, {amount: amount.inCents(), contact: contact.getId(), message, recurring},
                {
                    context: new DefinedHttpContexts().refresh().grant()
                })
        }else{
            return this.___requestTransferOut(amount,'pipe_emt_out',{contact: contact.getId(), recurring, message})
        }
    }

    /**
     * Gets the current active user member object for this fund
     */
    getCurrentMember(): FundMember | undefined{
        return this.findMember(this.fundUser.id);
    }

    /**
     * Checks if the fund is private
     * @returns
     */
    public isPrivate(): boolean {
        return this.fundData.shared==0;
    }

    /**
     * Gets the current balance of the fund
     * @returns
     */
    getBalance(): Figure {
        return new Figure(this?.fundData?.balance);
    }

    /**
     * Gets the id/name given to the fund
     * @returns
     */
    getFundName(): string {
        return this?.fundData?.account_name;
    }

    /**
     * Gets the fund number
     * @returns
     */
    getFundNumber(): string {
        return this?.fundData?.grid_account_number
    }

    /**
     * Gets all the members associated to the fund
     * @returns
     */
    getMembers(): FundMember[] {
        return this.fundData.members.map ( (item: any) => (new FundMember(item)));
    }

    /**
     * Finds a fund user matching the given id
     * @param fund_user_id
     * @returns
     */
    findMember(fund_user_id: number) : FundMember | undefined {
        return this.getMembers().find( item => item.getId() == fund_user_id )
    }

    /**
     * Finds a fund user matching the given id
     * @param fund_user_id
     * @returns
     */
    findMemberByGridAccountUserId(grid_account_user_id: number) : FundMember | undefined {
        return this.getMembers().find( item => item.getGridId()==grid_account_user_id )
    }

    /**
     * Gets Bank pending transactions on the fund
     */
    getPendingBankTransfers(): PendingBankTransfer[] {
        return this.fundData?.pending_bank_transfers?.map((item: any) => {
            const member = this.findMemberByGridAccountUserId(item.account_user_id)
            return new PendingBankTransfer(item, member)
        }) ?? [];
    }

    /**
     * Gets Emt pending transactions on the fund
     */
    getPendingEmtTransfers(): PendingEmtTransfer[] {
        return this.fundData?.pending_emt_transfers?.map((item: any) => new PendingEmtTransfer(item)) ?? [];
    }

    /**
     * Gets list of recurring BANK transactions
     */
    getRecurringBankTransfers(): RecurringBankTransfer[] {
        const transfers = this.fundData?.recurring_transfers?.bank;
        return transfers?.map((item: any) => {
            const member = this.findMemberByGridAccountUserId(item.account_user_id)
            return new RecurringBankTransfer(item, member)
        } ) ?? [];
    }

    /**
     * Gets list of recurring BANK transactions
     */
    getRecurringCardTransfers(): RecurringCardTransfer[] {
        const transfers = this.fundData?.recurring_transfers?.card;
        return transfers?.map((item: any) => {
            const member = this.findMemberByGridAccountUserId(item.account_user_id)
            return new RecurringCardTransfer(item, member ,this.http)
        } ) ?? [];
    }

    /**
     * Gets raw transactions data
     * @returns
     */
    getRawTransactions(): any[] {
        return sortTransaction(this?.fundData?.transactions ?? [])
    }

    /**
     * Gets list of all transactions on this fund
     * @returns
     */
    getTransactions () : Transaction[] {
        return this.getRawTransactions().map( (item: any) => (new Transaction(item, this.http)) )
    }

    /**
     * Gets the fund if
     * @returns
     */
    getId () : number {
        return this.fundID;
    }

    /**
     * Raw data
     * @returns ]
     */
    getData () : any {
        return this.fundUser;
    }

    /**
     * Checks if the fund is the same id as
     * @param id
     * @returns
     */
    is (id: number) {
        return this.fundID == id;
    }

    /**
     * Transfers to  a local account
     */
    transferTo (amount:Figure, target: Fund, comment: string | null = null) {
        if(this.isPrivate()){
            return this.___transferToPrivateFundMethod(amount, target.getId() , comment)
        }else{
            return this.___requestLocalTransferTo(amount,target,comment)
        }
    }

    /**
     * Transfer using private local pipe
     * @param amount
     * @param targetId
     * @param comment
     * @private
     */
    private ___transferToPrivateFundMethod (amount:Figure, targetId: number, comment: string | null = null): Observable<any> {
        return this.http.post(getEndpoint("funds.pipes.local", {fund: this.getId(), local: targetId}), {amount: amount.inCents(), comment:comment }, { context: new DefinedHttpContexts().refresh().grant() })
    }

    /**
     * Transfer using shared local pipe
     * @param amount
     * @param targetId
     * @param comment
     * @private
     */
    private ___requestLocalTransferTo (amount:Figure, targetFund: Fund, comment: string | null = null): Observable<any> {
        return this.___requestTransferOut(amount, 'pipe_local_out', {comment, destination_fund_user_id: targetFund.getCurrentMember()?.getId(), recurring: false })
    }

    public ___requestTransferOut (amount:Figure, type: FundRequestType, body: any = {}): Observable<any> {
        return this.http.post(getEndpoint("requests.transfer_out", {fund: this.getId()}), {amount: amount.inCents(), transfer_type: type, ...body }, { context: new DefinedHttpContexts().refresh().grant() })
    }

    updateName (name: string){
        return this.http
            .post(getEndpoint("funds.profile.name",{fund: this.getId()}), {name}, {context: new DefinedHttpContexts().refresh()})
    }

    private archiveObservable(archive: boolean){
        return this.http.post(getEndpoint("funds.profile.archive",{fund: this.getId()}), {archive}, {context: new DefinedHttpContexts().refresh()})
    }

    archive(){
        return this.archiveObservable(true)
    }

    unArchive(){
        return this.archiveObservable(false)
    }

    isArchived() {
        return this.fundData.archived;
    }
}
