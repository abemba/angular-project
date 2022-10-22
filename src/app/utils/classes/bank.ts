import {HttpClient} from "@angular/common/http";
import {Moment} from 'moment'
import {Endpoints, getEndpoint} from "../endpoints";
import {DefinedHttpContexts} from "../context";
import {Fund} from "./fund";
import {Figure} from "./figure";
import {formatDate} from "@angular/common";

export class Bank {
    constructor(private data: any, private http: HttpClient) {
    }

    getData() {
        return this.data;
    }

    getBankName() {
        return this.data.bank_name
    }

    getId() {
        return this.data.id;
    }

    /**
     * Transfer funds from a local account to a bank account
     * @param from
     * @param amount
     * @param recurring
     * @param frequency
     * @param start_date
     */
    transferOut(from: Fund | null, amount: Figure, recurring: boolean, frequency: number | null = null, start_date: Moment | null = null) {
        const date_formatted = start_date ? start_date.format("YYYY-MM-DD") : null;
        if (from?.isPrivate()) {
            const url = getEndpoint("funds.pipes.bank.out", {id: this.getId(), fund: from?.getId()})
            return this.http.post(url,
                {
                    amount: amount.inCents(),
                    recurring,
                    frequency,
                    start_date: start_date ? date_formatted : null
                }, {context: new DefinedHttpContexts().refresh().grant()})

        } else {
            return from?.___requestTransferOut(amount, 'pipe_bank_out', {
                recurring,
                frequency,
                start_date: date_formatted,
                fund_pipe_bank_id: this.getId()
            })
        }
    }

    /**
     * Transfers money from source bank to a local fund
     * @param to
     * @param amount
     * @param recurring
     * @param frequency
     * @param start_date
     */
    transferIn(to: Fund | null, amount: Figure, recurring: boolean, frequency: number | null = null, start_date: Moment | null = null) {
        const url = getEndpoint("FUNDS.PIPES.BANK.IN", {id: this.getId(), fund: to?.getId()})
        return this.http.post(url,
            {
                amount: amount.inCents(),
                recurring,
                frequency,
                start_date: start_date ? start_date.format("YYYY-MM-DD") : null
            }, {context: new DefinedHttpContexts().refresh().grant()})
    }

    /**
     * Gets the descriptor for the bank
     */
    getDescriptor() {
        return this.data.bank_number + "***" + this.data.last_4 + ' ' + this.getBankName();
    }

}
