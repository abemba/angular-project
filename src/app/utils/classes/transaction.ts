import {HttpClient} from "@angular/common/http";
import {padZeros, transactionDescription} from "../functions";
import {Figure} from "./figure";
import {map, Observable} from "rxjs";
import {Endpoints} from "../endpoints";
import {TransactionType} from "../transaction-type";
import * as moment from "moment/moment";
import {Chargeable} from "./chargeable";
import {ChargeableBase} from "./chargeablebase";
import {Percent} from "./percent";

/**
 * Transaction
 */
export class Transaction {
    constructor(private data: any, private http: HttpClient) {}

    getDate () {
        return this.data.created_at;
    }

    /**
     * Gets the data
     * @returns
     */
    getId () {
        return this.data.id;
    }

    /**
     * Gets a text representation of the channel id
     * @returns
     */
    getDescription(){
        return transactionDescription(this.data?.channel_id);
    }

    /**
     * Get the grid account user id
     * @returns
     */
    getGridAccountUserId () {
        return this.data.account_user_id;
    }

    /**
     * Get the Figure representing the amount in dollars and in cents
     * @returns
     */
    getAmount (): Figure {
        return new Figure(this.data.amount);
    }

    /**
     * Get the balance representing the amount in dollars and in figures
     * @returns
     */
    getBalance () {
        return new Figure(this.data.balance);
    }

    /**
     * Checks if the type of transaction is a withdraw
     * @returns
     */
    isWithdraw () {
        return this.data.amount < 0;
    }

    /**
     * Checks if the type of transaction is a deposit
     * @returns
     */
    isDeposit () {
        return this.data.amount > 0;
    }

    /**
     * Gets a sign representing whether a transaction is a deposit or withdraw
     * @returns
     */
    getSign (): string {
        return this.isDeposit() ? '+ ' : '- ';
    }

    /**
     *
     * @returns
     */
    getTransactionNumber (): string {
        return 'TR'+padZeros(this.getId());
    }

    /**
     *
     * @returns
     */
    fetchDetails (): Observable<any> {
        return this.http.get<any>(Endpoints.FUNDS.TRANSACTIONS.DETAILS,
            {
                params: {
                    "grid_channel_type": this.data.channel_id,
                    "grid_channel_pri_key": this.data.channel_pri_key,
                }
            })
    }

    fetchFormattedDetails (): Observable<any[]> {
        return this.fetchDetails().pipe(
            map(
                data => {
                    let rt: any[] = [];
                    switch (this.data.channel_id) {
                        case TransactionType.EMT_IN:
                            rt.push(["From",data?.detail?.name])
                            rt.push(["Reference",data?.detail?.payment_key])
                            rt.push(["Received on",moment(data?.detail?.received_at).format('ll')])
                            break;

                        case TransactionType.EMT_OUT:
                            rt.push(["Sent",moment(data?.detail?.created_at).format('ll')])
                            rt.push(["Sent To",data?.detail?.name])
                            rt.push(["Email",data?.detail?.receiving_email])
                            rt.push(["Security Question",data?.detail?.question])
                            rt.push(["Security Answer",data?.detail?.response])
                            rt.push(["Message",data?.detail?.message])
                            break;

                        case TransactionType.LOCAL:
                            rt.push(["Local Account #","784521"])
                            break;

                        case TransactionType.STRIPE_CARD:
                        case TransactionType.STRIPE_CARD_REFUND:
                            const chargeableBase = new ChargeableBase(Figure.fromCents(data?.detail?.base_fee), Percent.fromPercent(data?.detail?.commission))
                            const chargeable = chargeableBase.ofCents(this.getAmount().inCents())
                            rt.push(["Fees","$"+chargeable.getCost().inDollars().toFixed(2)])
                            rt.push(["Card #","*****"+data?.detail?.card?.last_4])
                            rt.push(["Brand",data?.detail?.card?.brand])
                            break;

                        case TransactionType.BANK:
                            rt.push(["Bank",data?.detail?.eft?.bank_name])
                            rt.push(["Scheduled", moment(data?.detail?.scheduled_date).format("ll")])
                            rt.push(["Processed", data?.detail?.processed_date ? moment(data?.detail?.processed_date).format("ll"):'Pending'])
                            break;

                        default:
                            break;
                    }
                    return rt;
                }))
    }
}
